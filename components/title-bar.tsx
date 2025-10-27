"use client"

import Image from "next/image"

export function TitleBar() {
  return (
    <div className="w-full flex items-center justify-center gap-4 py-4">
      <Image src="/images/aart-logo.png" alt="AART Logo" width={56} height={56} className="object-contain" />
      <h1 className="text-2xl font-semibold text-white text-center">{"Employee \nTime Logger"} </h1>
    </div>
  )
}
