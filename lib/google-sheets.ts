export function formatTime12Hour(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Toronto",
  })
}

export function formatDate(date: Date): string {
  const dateStr = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Toronto",
  })
  return dateStr
}

// Function to log time to Google Sheets
export async function logTimeToSheet(
  employeeCode: string,
  type: "In" | "Out",
): Promise<{ success: boolean; message: string }> {
  const webAppUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

  if (!webAppUrl) {
    console.error("[v0] Google Sheets URL not configured")
    return {
      success: false,
      message: "Google Sheets integration not configured",
    }
  }

  const now = new Date()
  const date = formatDate(now)
  const time = formatTime12Hour(now)

  const payload = {
    employeeCode,
    date,
    type, // "In" or "Out"
    time, // Single time field
  }

  try {
    console.log("[v0] Sending to Google Sheets:", payload)

    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      mode: "no-cors", // Required for Google Apps Script
    })

    // Note: With no-cors mode, we can't read the response
    // We'll assume success if no error is thrown
    console.log("[v0] Time logged to Google Sheets successfully")

    return {
      success: true,
      message: "Time logged successfully",
    }
  } catch (error) {
    console.error("[v0] Error logging to Google Sheets:", error)
    return {
      success: false,
      message: "Failed to log time",
    }
  }
}
