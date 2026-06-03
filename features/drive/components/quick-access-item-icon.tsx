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
          className="size-12 fill-[#49597E] text-[#38bdf8] dark:fill-[#646c7f] dark:text-[#38bdf8]"
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
      className="flex size-8 shrink-0 flex-col items-center justify-center rounded-[4px] bg-[#dc2626] px-0.5 text-[7px] leading-tight font-bold text-white shadow-sm"
      aria-hidden
    >
      PDF
    </div>
  )
}
