"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { DashboardStats } from "@/features/dashboard/types"

type ActivityChartProps = {
  data: DashboardStats["activity"]
  summary: DashboardStats["activitySummary"]
}

const activityChartConfig = {
  value: {
    label: "Activity",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ActivityChart({ data, summary }: ActivityChartProps) {
  const isPositive = summary.trendPct >= 0
  return (
    <Card size="sm" className="h-full min-h-[204px] rounded-lg ring-foreground/5 shadow-none">
      <CardContent className="flex h-full flex-col gap-2.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground">Activity</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{summary.periodLabel}</span>
            <span
              className={
                isPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }
            >
              {isPositive ? "+" : ""}
              {summary.trendPct.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="h-[94px] w-full">
          <ChartContainer config={activityChartConfig} className="h-full w-full">
            <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelKey="label" indicator="line" />}
              />
              <defs>
                <linearGradient id="activity-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                fill="url(#activity-gradient)"
                isAnimationActive={false}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Average Activity of the Month</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            {summary.level}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
