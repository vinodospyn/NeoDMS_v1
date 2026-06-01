export const dashboardTabs = [
  { value: "requests", label: "My Requests" },
  { value: "batches", label: "Batches" },
] as const

export type DashboardTab = (typeof dashboardTabs)[number]["value"]

const dashboardTabValueSet = new Set<DashboardTab>(dashboardTabs.map((tab) => tab.value))

export function isDashboardTab(value: string): value is DashboardTab {
  return dashboardTabValueSet.has(value as DashboardTab)
}
