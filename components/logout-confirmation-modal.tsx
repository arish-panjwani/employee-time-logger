"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface LogoutConfirmationModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function LogoutConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
}: LogoutConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-40 blur-xl" />

        {/* Border */}
        <div className="relative rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 p-[2px]">
          <div className="rounded-3xl bg-[#0a0a0a]/95 backdrop-blur-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">Are sure want to log out?</h2>

            {/* Button group */}
            <div className="flex gap-4">
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging Out...</span>
                  </>
                ) : (
                  "Yes, Log Out"
                )}
              </button>
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 py-4 rounded-full border-2 border-white text-white text-xl font-semibold transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
