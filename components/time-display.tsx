"use client"

import { useState, useEffect } from "react"

export function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "America/Toronto",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: "America/Toronto",
    })
  }

  return (
    <div className="text-center space-y-1">
      <h1 className="text-[27px] md:text-[36px] font-bold text-white tracking-tight">{formatTime(currentTime)}</h1>
      <p className="text-[14.4px] text-gray-300">Today, {formatDate(currentTime)}</p>
    </div>
  )
}
