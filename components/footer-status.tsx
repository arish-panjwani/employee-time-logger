"use client"

import { Sparkles } from "lucide-react"

interface FooterStatusProps {
  showSyncStatus?: boolean
}

export function FooterStatus({ showSyncStatus = true }: FooterStatusProps) {
  return (
    <div className="relative z-10 flex items-center gap-2 text-gray-400 text-sm">
      {showSyncStatus && (
        <>
          
          
        </>
      )}
      
      
    </div>
  )
}
