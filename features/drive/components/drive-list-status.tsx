import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  children: ReactNode
  tone?: "default" | "success" | "warning" | "info" | "muted"
  className?: string
}

function StatusBadge({ children, tone = "default", className }: StatusBadgeProps) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
        : tone === "info"
          ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
          : tone === "muted"
            ? "border-border bg-muted/40 text-muted-foreground"
            : "border-border bg-background text-foreground"

  return (
    <Badge variant="outline" className={cn("font-medium", toneClass, className)}>
      {children}
    </Badge>
  )
}

export function PermissionBadge({ permission }: { permission: string }) {
  const tone =
    permission === "Edit"
      ? "success"
      : permission === "Comment"
        ? "info"
        : "muted"
  return <StatusBadge tone={tone}>{permission}</StatusBadge>
}

export function ActivityTypeBadge({ activityType }: { activityType: string }) {
  const tone =
    activityType === "Edited"
      ? "info"
      : activityType === "Shared"
        ? "success"
        : activityType === "Downloaded"
          ? "warning"
          : "muted"
  return <StatusBadge tone={tone}>{activityType}</StatusBadge>
}

export function RetentionStatusBadge({ status }: { status: string }) {
  return <StatusBadge tone="warning">{status}</StatusBadge>
}
