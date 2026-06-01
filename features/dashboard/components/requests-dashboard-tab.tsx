"use client"

import { ActivityChart } from "@/features/dashboard/components/activity-chart"
import { BuyEstampCta } from "@/features/dashboard/components/buy-estamp-cta"
import { CreditUsageChart } from "@/features/dashboard/components/credit-usage-chart"
import { DashboardKpiCards } from "@/features/dashboard/components/dashboard-kpi-cards"
import { NeoTable } from "@/features/dashboard/components/neo-table"
import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats"

export function RequestsDashboardTab() {
  const { data: stats } = useDashboardStats()

  return (
    <>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <DashboardKpiCards stats={stats.totals} />
        </div>
        <div className="lg:col-span-1">
          <CreditUsageChart data={stats.creditUsage} total={stats.creditUsageTotal} />
        </div>
        <div className="lg:col-span-1">
          <ActivityChart data={stats.activity} summary={stats.activitySummary} />
        </div>
        <div className="lg:col-span-1">
          <BuyEstampCta />
        </div>
      </div>

      <NeoTable />
    </>
  )
}
