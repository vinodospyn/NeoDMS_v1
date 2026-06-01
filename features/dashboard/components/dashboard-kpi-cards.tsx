"use client"

import { Clock, FileText, PenLine, Stamp, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { DashboardStat } from "@/features/dashboard/types"

const STAT_ICONS: Record<DashboardStat["id"], LucideIcon> = {
  documents: FileText,
  esigned: PenLine,
  estamped: Stamp,
  draft: Clock,
}

const STAT_ICON_TINTS: Record<DashboardStat["id"], string> = {
  documents: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  esigned: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  estamped: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  draft: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
}

type DashboardKpiCardsProps = {
  stats: DashboardStat[]
}

export function DashboardKpiCards({ stats }: DashboardKpiCardsProps) {
  return (
    <div className="grid h-full min-h-[204px] p-2 grid-cols-2 overflow-hidden rounded-lg bg-background">
      {stats.map((stat, idx) => {
        const Icon = STAT_ICONS[stat.id]
        const isPositive = stat.delta >= 0
        const cellClass = cn(
          "relative min-h-[102px] p-3.5 sm:p-4",
          idx === 0 && "border-r border-b",
          idx === 1 && "border-b",
          idx === 2 && "border-r"
        )
        return (
          <div key={stat.id} className={cellClass}>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-xl leading-none font-semibold tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p
                className={cn(
                  "inline-flex rounded px-1.5 py-0.5 text-xs font-medium tabular-nums",
                  isPositive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                )}
              >
                {isPositive ? "+" : ""}
                {stat.delta.toFixed(1)}%
              </p>
            </div>
            <div
              className={cn(
                "absolute top-3.5 right-3.5 flex size-9 shrink-0 items-center justify-center rounded-xl",
                STAT_ICON_TINTS[stat.id]
              )}
              aria-hidden
            >
              <Icon className="size-4" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
