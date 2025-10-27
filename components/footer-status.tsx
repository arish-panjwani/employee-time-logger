"use client"

import { Sparkles } from "lucide-react"

interface FooterStatusProps {
  showSyncStatus?: boolean
}

export function FooterStatus({ showSyncStatus = true }: FooterStatusProps) {
  return (
    <div className="relative z-10 text-gray-400 text-sm">
      {showSyncStatus ? (
        <div className="flex items-center gap-2">
          
          
          
          
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span>v1.0</span>
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="text-xs text-gray-500">Made by Arish Panjwani</div>
        </div>
      )}
    </div>
  )
}
