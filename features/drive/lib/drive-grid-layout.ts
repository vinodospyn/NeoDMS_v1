import { cn } from "@/lib/utils"

/** Shared spacing for drive grid cards and aligned explorer chrome. */
export const DRIVE_GRID_GAP = "gap-4"
export const DRIVE_GRID_PADDING = "p-4"

export const driveExplorerChromeSectionClass = cn(
  "flex shrink-0 flex-col border-b border-border/60 bg-background",
  DRIVE_GRID_GAP,
  DRIVE_GRID_PADDING
)

export const driveExplorerChromeRowClass = cn(
  "flex min-w-0 shrink-0 items-center",
  DRIVE_GRID_GAP
)
