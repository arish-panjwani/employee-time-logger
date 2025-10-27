# Google Sheets Integration Setup

This guide will help you set up the Google Sheets integration for the Time Logger app.

## Step 1: Set Up Google Apps Script

1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1FC-4mdbaVjgLJ8gXBEoFOUj-5BB2nJ1tZcebzl_yzTw/edit](https://docs.google.com/spreadsheets/d/1FC-4mdbaVjgLJ8gXBEoFOUj-5BB2nJ1tZcebzl_yzTw/edit)

2. Go to **Extensions > Apps Script**

3. Delete any existing code and paste the following script:

\`\`\`javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Master")
    
    if (!sheet) {
      throw new Error("Sheet 'Master' not found")
    }

    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Sr. No.", "Employee Code", "Date", "Type", "Time"])
      sheet.getRange("A1:E1").setFontWeight("bold")
    }

    const data = JSON.parse(e.postData.contents)
    const { employeeCode, date, type, time } = data
    
    Logger.log("Received data: " + JSON.stringify(data))

    // Always create a new row for each log entry
    const lastRow = sheet.getLastRow()
    const srNo = lastRow // This will be the new row number minus header
    
    // Append new row with employee code, date, type (In/Out), and time
    sheet.appendRow([srNo, employeeCode, date, type, time])
    Logger.log("Created new row: " + srNo + " | " + employeeCode + " | " + date + " | " + type + " | " + time)

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Time logged successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
    
  } catch (error) {
    Logger.log("Error: " + error.toString())
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "API is running",
      message: "Use POST method to log time",
    }),
  ).setMimeType(ContentService.MimeType.JSON)
}
\`\`\`

4. Click **Save** (disk icon)

## Step 2: Deploy as Web App

**IMPORTANT**: You need to create a NEW deployment for the changes to take effect.

1. Click **Deploy > New deployment**

2. Click the gear icon next to "Select type" and choose **Web app**

3. Configure the deployment:
   - **Description**: Time Logger API v3 (or increment version)
   - **Execute as**: Me
   - **Who has access**: Anyone

4. Click **Deploy**

5. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** if you see a warning
   - Click **Go to [Project Name] (unsafe)**
   - Click **Allow**

6. **Copy the NEW Web App URL** - it will look like:
   \`\`\`
   https://script.google.com/macros/s/AKfycby.../exec
   \`\`\`

## Step 3: Update Environment Variable

1. In the v0 interface, click the **sidebar** on the left

2. Go to the **Vars** section

3. Update the environment variable:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SHEETS_URL`
   - **Value**: [Paste the NEW Web App URL you copied]

4. Save the environment variable

5. **Refresh the app** to load the new URL

## Step 4: Update Sheet Headers

Manually update your Google Sheet headers to match the new structure:

| Sr. No. | Employee Code | Date | Type | Time |
|---------|---------------|------|------|------|

Delete the old "In Time" and "Out Time" columns and replace with "Type" and "Time".

## Step 5: Test the Integration

1. Clear any test data from your Google Sheet (keep the header row)

2. Enter an employee code and submit

3. Click "Log In" - a new row should be created with Type = "In" and the current time

4. Click "Log Out" - a new row should be created with Type = "Out" and the current time

## Troubleshooting

- **Wrong time being logged**: Make sure you deployed a NEW deployment (not just saved the script)
- **Data not appearing in sheet**: Check that the sheet is named "Master" (case-sensitive)
- **Authorization errors**: Make sure you authorized the script and set "Who has access" to "Anyone"
- **Environment variable not working**: Ensure the variable name is exactly `NEXT_PUBLIC_GOOGLE_SHEETS_URL` and starts with `NEXT_PUBLIC_`

## Sheet Structure

Each login and logout creates a separate row:

| Sr. No. | Employee Code | Date | Type | Time |
|---------|---------------|------|------|------|
| 1       | 001           | 10/27/2025 | In | 9:15 AM |
| 2       | 001           | 10/27/2025 | Out | 5:30 PM |
| 3       | 002           | 10/27/2025 | In | 10:00 AM |

- **Time Format**: 12-hour format (HH:MM AM/PM) - uses Toronto timezone
- **Date Format**: M/D/YYYY
- **Type**: "In" for login, "Out" for logout
- **Behavior**: Each action creates a new row (no updates to existing rows)
