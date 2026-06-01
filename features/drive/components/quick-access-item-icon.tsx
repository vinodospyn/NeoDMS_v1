import { Folder, Star } from "lucide-react"

import type { QuickAccessItemKind } from "@/features/drive/data/mock-dashboard"

type QuickAccessItemIconProps = {
  kind: QuickAccessItemKind
}

export function QuickAccessItemIcon({ kind }: QuickAccessItemIconProps) {
  if (kind === "folder") {
    return (
      <div
        className="relative flex size-8 shrink-0 items-center justify-center"
        aria-hidden
      >
        <Folder
          className="size-8 fill-[#1d4ed8] text-[#38bdf8]"
          strokeWidth={1}
        />
        <Star
          className="absolute size-[11px] fill-white text-white"
          strokeWidth={0}
        />
      </div>
    )
  }

  if (kind === "docx") {
    return (
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#2b579a] text-[11px] font-bold text-white shadow-sm"
        aria-hidden
      >
        W
      </div>
    )
  }

  return (
    <div
      className="flex size-8 shrink-0 flex-col items-center justify-center rounded-[4px] bg-[#dc2626] px-0.5 text-[7px] font-bold leading-tight text-white shadow-sm"
      aria-hidden
    >
      PDF
    </div>
  )
}
