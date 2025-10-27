// @ts-nocheck
// eslint-disable-next-line
/* eslint-disable */

// INSTRUCTIONS:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1FC-4mdbaVjgLJ8gXBEoFOUj-5BB2nJ1tZcebzl_yzTw/edit
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code and paste this entire script
// 4. Click "Deploy" > "New deployment"
// 5. Select type: "Web app"
// 6. Set "Execute as": "Me"
// 7. Set "Who has access": "Anyone"
// 8. Click "Deploy" and copy the Web App URL
// 9. Add the URL as NEXT_PUBLIC_GOOGLE_SHEETS_URL environment variable in your project

// NOTE: This file is NOT executed in Next.js. It's meant to be copied to Google Apps Script.
// SpreadsheetApp and ContentService are Google Apps Script global objects.

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Master")

    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Sr. No.", "Employee Code", "Date", "In Time", "Out Time"])
      sheet.getRange("A1:E1").setFontWeight("bold")
    }

    const data = JSON.parse(e.postData.contents)
    const { employeeCode, date, inTime, outTime } = data

    // Check if there's an existing entry for this employee and date
    const lastRow = sheet.getLastRow()
    let rowFound = false

    for (let i = 2; i <= lastRow; i++) {
      const existingEmployeeCode = sheet.getRange(i, 2).getValue()
      const existingDate = sheet.getRange(i, 3).getValue()

      if (existingEmployeeCode == employeeCode && existingDate == date) {
        // Update the out time for existing entry
        if (outTime) {
          sheet.getRange(i, 5).setValue(outTime)
        }
        rowFound = true
        break
      }
    }

    // If no existing entry found and we have an in time, create new row
    if (!rowFound && inTime) {
      const srNo = lastRow // Sr. No. is the row number minus header
      sheet.appendRow([srNo, employeeCode, date, inTime, outTime || ""])
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Time logged successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
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
