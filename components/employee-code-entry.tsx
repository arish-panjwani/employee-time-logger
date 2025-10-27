"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

interface EmployeeCodeEntryProps {
  onSubmit: (code: string) => void
  isLoading?: boolean
}

export function EmployeeCodeEntry({ onSubmit, isLoading = false }: EmployeeCodeEntryProps) {
  const [code, setCode] = useState("")
  const lottieRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationInstance: any = null

    const loadLottie = async () => {
      if (lottieRef.current) {
        const lottie = (await import("lottie-web")).default
        const animationData = await fetch("/animations/computer-operator-typing.json").then((res) => res.json())

        animationInstance = lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
        })
      }
    }

    loadLottie()

    return () => {
      if (animationInstance) {
        animationInstance.destroy()
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim() && !isLoading) {
      onSubmit(code.trim())
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div ref={lottieRef} className="w-48 h-48 mx-auto" />

      <h2 className="text-xl font-bold text-white text-center">Enter your Employee Code</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-md" />
          <div className="relative rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-[2px]">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-full bg-[#1a1a1a] text-white text-base text-center tracking-[0.5em] placeholder:tracking-normal placeholder:text-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••"
              maxLength={10}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  )
}
