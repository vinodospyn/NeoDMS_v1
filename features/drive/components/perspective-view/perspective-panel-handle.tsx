"use client"

import type { ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { ResizableHandle } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"

type PerspectivePanelHandleProps = {
  className?: string
}

function GripButton({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex size-[22px] shrink-0 items-center justify-center rounded-[5px] border border-border/70 bg-background shadow-[0_1px_2px_rgb(15_23_42/6%)]">
      {children}
    </div>
  )
}

export function PerspectivePanelHandle({ className }: PerspectivePanelHandleProps) {
  return (
    <ResizableHandle
      aria-label="Resize panel"
      className={cn(
        "relative z-30 w-px shrink-0 border-0 bg-border/70 p-0 shadow-none",
        "hover:bg-border active:bg-border",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-7 after:-translate-x-1/2 after:bg-transparent",
        className
      )}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
        <GripButton>
          <ChevronRight className="size-3 text-muted-foreground" strokeWidth={2.25} />
        </GripButton>
        <GripButton>
          <ChevronLeft className="size-3 text-muted-foreground" strokeWidth={2.25} />
        </GripButton>
      </div>
    </ResizableHandle>
  )
}
