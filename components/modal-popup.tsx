"use client"

import { useEffect, useRef } from "react"
import lottie, { type AnimationItem } from "lottie-web"

interface ModalPopupProps {
  isOpen: boolean
  message: string
  onClose: () => void
  animationType?: "in" | "out"
}

export function ModalPopup({ isOpen, message, onClose, animationType = "in" }: ModalPopupProps) {
  const animationContainer = useRef<HTMLDivElement>(null)
  const animationInstance = useRef<AnimationItem | null>(null)

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

  useEffect(() => {
    if (isOpen && animationContainer.current) {
      const animationPath =
        animationType === "in" ? "/animations/new-start-of-work.json" : "/animations/end-of-work.json"

      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
      })

      return () => {
        animationInstance.current?.destroy()
      }
    }
  }, [isOpen, animationType])

  if (!isOpen) return null

  const animationSize = animationType === "out" ? "w-[154px] h-[154px]" : "w-32 h-32"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-40 blur-xl" />

        {/* Border */}
        <div className="relative rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 p-[2px]">
          <div className="rounded-3xl bg-[#0a0a0a]/95 backdrop-blur-xl p-4 space-y-3">
            <div ref={animationContainer} className={`${animationSize} mx-auto`} />

            <h2 className="text-lg font-bold text-white text-center">Done 🥳</h2>

            <p className="text-sm text-gray-300 text-center">
              Your {message.includes("In") ? "IN-" : "OUT-"}time has been saved!!!
            </p>

            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
