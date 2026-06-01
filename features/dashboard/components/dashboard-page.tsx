"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BatchesDashboardTab } from "@/features/dashboard/components/batches-dashboard-tab"
import {
  dashboardTabs,
  isDashboardTab,
  type DashboardTab,
} from "@/features/dashboard/components/dashboard-tabs"
import { RequestsDashboardTab } from "@/features/dashboard/components/requests-dashboard-tab"

const tabContent: Record<DashboardTab, React.ReactNode> = {
  requests: <RequestsDashboardTab />,
  batches: <BatchesDashboardTab />,
}

export function DashboardPage() {
  const [tab, setTab] = React.useState<DashboardTab>("requests")
  const handleTabChange = React.useCallback((value: string) => {
    if (isDashboardTab(value)) {
      setTab(value)
    }
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 px-6 md:px-8">
      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="w-full border-b border-border/60">
          <TabsList variant="line" className="px-0">
            {dashboardTabs.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="px-4">
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {dashboardTabs.map((item) => (
          <TabsContent key={item.value} value={item.value} className="space-y-5">
            {tabContent[item.value]}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
