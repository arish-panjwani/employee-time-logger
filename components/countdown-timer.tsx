"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetTime: Date
}

export function CountdownTimer({ targetTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetTime.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft("00:00:00")
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetTime])

  return (
    <div className="text-center space-y-6 animate-in fade-in duration-500">
      <p className="text-2xl text-gray-300">Next log available in...</p>
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30" />

        {/* Timer text */}
        <h2 className="relative text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
          {timeLeft}
        </h2>
      </div>
    </div>
  )
}
