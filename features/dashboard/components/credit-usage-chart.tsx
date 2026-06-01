"use client"

import { Bar, BarChart, XAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { DashboardStats } from "@/features/dashboard/types"

type CreditUsageChartProps = {
  data: DashboardStats["creditUsage"]
  total: DashboardStats["creditUsageTotal"]
}

const creditUsageChartConfig = {
  value: {
    label: "Credits Used",
    color: "oklch(0.64 0.18 304)",
  },
} satisfies ChartConfig

export function CreditUsageChart({ data, total }: CreditUsageChartProps) {
  return (
    <Card size="sm" className="h-full min-h-[204px] rounded-lg ring-foreground/5 shadow-none">
      <CardContent className="flex h-full flex-col gap-2.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground">Credit Usage</p>
          <div className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {total.periodLabel}
          </div>
        </div>

        <div className="h-[94px] w-full">
          <ChartContainer config={creditUsageChartConfig} className="h-full w-full">
            <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="label" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelKey="label" indicator="dot" />}
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[4, 4, 4, 4]}
                barSize={14}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Average spending</span>
          <span className="tabular-nums">
            {total.used} / {total.total}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
