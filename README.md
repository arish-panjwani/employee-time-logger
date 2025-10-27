# AART Consultancy Time Logger App

A modern, mobile-first Progressive Web App (PWA) for tracking employee work hours with automatic Google Sheets integration.

## Features

- **Employee Time Tracking**: Simple login/logout system with employee code authentication
- **Real-time Clock**: Displays current time and date in Toronto timezone
- **Google Sheets Integration**: Automatically logs all time entries to a Google Spreadsheet
- **Animated UI**: Engaging Lottie animations for better user experience
- **Mobile-First Design**: Optimized for mobile devices with PWA capabilities
- **Dark Theme**: Modern dark interface with cyan/blue accents

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Lottie (lottie-web)
- **Backend**: Google Apps Script (for Sheets integration)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main application logic
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles and design tokens
├── components/
│   ├── title-bar.tsx         # App header with logo
│   ├── employee-code-entry.tsx   # Login screen
│   ├── time-display.tsx      # Clock display
│   ├── log-in-out-buttons.tsx    # Time logging buttons
│   ├── modal-popup.tsx       # Success modals
│   └── footer-status.tsx     # Footer with version info
├── lib/
│   └── google-sheets.ts      # Google Sheets API integration
├── public/
│   ├── images/
│   │   └── aart-logo.png     # Company logo
│   └── animations/           # Lottie animation files
└── GOOGLE_SHEETS_SETUP.md    # Detailed setup instructions
\`\`\`

## Setup Instructions

### 1. Clone and Install

\`\`\`bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

### 2. Configure Google Sheets Integration

#### Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: [Your Sheet URL]
2. Create a sheet named **"Master"**
3. Add the following headers in Row 1:
   - Column A: `Sr. No.`
   - Column B: `Employee Code`
   - Column C: `Date`
   - Column D: `Type`
   - Column E: `Time`

#### Step 2: Deploy Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy the script from `GOOGLE_SHEETS_SETUP.md`
4. Click **Deploy > New deployment**
5. Select **Web app** as deployment type
6. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy** and copy the Web App URL

#### Step 3: Add Environment Variable

Add the Web App URL to your environment variables:

\`\`\`bash
# .env.local
NEXT_PUBLIC_GOOGLE_SHEETS_URL=your-web-app-url-here
\`\`\`

Or add it through the v0 UI:
- Open the **Vars** section in the sidebar
- Add `NEXT_PUBLIC_GOOGLE_SHEETS_URL` with your Web App URL

### 3. Run the Application

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the app.

## Usage

### For Employees

1. **Enter Employee Code**: On the home screen, enter your unique employee code
2. **Log In**: Click the "Log In" button when starting work
3. **Log Out**: Click the "Log Out" button when finishing work
4. **View Confirmation**: Success modals confirm each action

### Time Logging Format

All times are logged in Toronto timezone (America/Toronto) in 12-hour format:
- **Date**: MM/DD/YYYY
- **Time**: HH:MM AM/PM
- **Type**: "In" or "Out"

### Google Sheets Output

Each time entry creates a new row:

| Sr. No. | Employee Code | Date       | Type | Time     |
|---------|---------------|------------|------|----------|
| 1       | 001           | 10/27/2025 | In   | 9:00 AM  |
| 2       | 001           | 10/27/2025 | Out  | 5:30 PM  |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_SHEETS_URL` | Google Apps Script Web App URL | Yes |

## Deployment

### Deploy to Vercel

1. Click the **Publish** button in v0
2. Or push to GitHub and connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### PWA Installation

Users can install the app on their mobile devices:
1. Open the app in a mobile browser
2. Tap "Add to Home Screen"
3. Use like a native app

## Troubleshooting

### Time Not Logging

- Verify the Google Apps Script is deployed as a **new deployment** (not just saved)
- Check that the Web App URL is correct in environment variables
- Ensure the sheet name is exactly **"Master"**
- Check browser console for error messages

### Wrong Timezone

- The app uses Toronto timezone (America/Toronto)
- Verify your browser allows timezone detection
- Check that the Google Apps Script is using the time values from the request

### Animations Not Loading

- Ensure Lottie JSON files are in `public/animations/`
- Check browser console for 404 errors
- Verify the animation paths in components

## Version

**v1.0** - Initial Release

## Support

For issues or questions, contact AART Consultancy support.

## License

Proprietary - AART Consultancy
