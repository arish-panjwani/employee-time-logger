"use client"

import { useState } from "react"
import { TimeDisplay } from "@/components/time-display"
import { ModalPopup } from "@/components/modal-popup"
import { FooterStatus } from "@/components/footer-status"
import { TitleBar } from "@/components/title-bar"
import { EmployeeCodeEntry } from "@/components/employee-code-entry"
import { logTimeToSheet } from "@/lib/google-sheets"
import { LogInOutButtons } from "@/components/log-in-out-buttons"

type AppState = "employee-entry" | "time-logger"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("employee-entry")
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"in" | "out">("in")
  const [employeeCode, setEmployeeCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<"in" | "out" | null>(null)

  const handleEmployeeCodeSubmit = async (code: string) => {
    setIsLoading(true)
    setEmployeeCode(code)
    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    setAppState("time-logger")
    setIsLoading(false)
  }

  const handleLogAction = async (action: "in" | "out") => {
    setLoadingAction(action)

    // Log time to Google Sheets
    const result = await logTimeToSheet(employeeCode, action)

    // Show confirmation modal
    setModalType(action)
    setModalMessage(action === "in" ? "In Time Logged!" : "Out Time Logged!")
    setShowModal(true)

    setLoadingAction(null)
  }

  const handleModalClose = () => {
    setShowModal(false)

    // If it was a logout, return to employee entry screen
    if (modalType === "out") {
      setAppState("employee-entry")
      setEmployeeCode("")
    }
    // If it was a login, stay on the time logger page (do nothing)
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a] flex flex-col items-center justify-between p-6 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

      <TitleBar />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center flex-1 space-y-3">
        {appState === "employee-entry" ? (
          <EmployeeCodeEntry onSubmit={handleEmployeeCodeSubmit} isLoading={isLoading} />
        ) : (
          <>
            <TimeDisplay />

            <div className="flex-1 flex items-center justify-center w-full">
              <LogInOutButtons onAction={handleLogAction} loadingAction={loadingAction} />
            </div>
          </>
        )}
      </div>

      <FooterStatus showSyncStatus={appState === "time-logger"} />

      <ModalPopup isOpen={showModal} message={modalMessage} onClose={handleModalClose} animationType={modalType} />
    </main>
  )
}
