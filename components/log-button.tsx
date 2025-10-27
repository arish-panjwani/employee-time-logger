"use client"

import { Play, Loader2 } from "lucide-react"

interface LogButtonProps {
  mode: "login" | "logout"
  onAction: (action: "in" | "out") => void
  isLoading?: boolean
}

export function LogButton({ mode, onAction, isLoading = false }: LogButtonProps) {
  const handleClick = () => {
    if (!isLoading) {
      onAction(mode === "login" ? "in" : "out")
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="relative group w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />

      {/* Border ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-[3px]">
        <div className="w-full h-full rounded-full bg-[#0a0a0a]" />
      </div>

      {/* Button content */}
      <div className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            <span className="text-lg font-semibold text-white">Processing...</span>
          </>
        ) : (
          <>
            <span className="text-xl font-semibold text-white">{mode === "login" ? "Log In" : "Log Out"}</span>
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          </>
        )}
      </div>
    </button>
  )
}
