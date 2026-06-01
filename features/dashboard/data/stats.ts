import type { DashboardStats } from "@/features/dashboard/types"

export const mockDashboardStats: DashboardStats = {
  totals: [
    { id: "documents", label: "Documents", value: 100, delta: 6.4 },
    { id: "esigned", label: "E-Signed", value: 45, delta: 3.4 },
    { id: "estamped", label: "E-Stamped", value: 30, delta: -1.4 },
    { id: "draft", label: "In Draft", value: 25, delta: 5.4 },
  ],
  creditUsage: [
    { label: "W1", value: 32 },
    { label: "W2", value: 38 },
    { label: "W3", value: 34 },
    { label: "W4", value: 46 },
    { label: "W5", value: 42 },
    { label: "W6", value: 50 },
    { label: "W7", value: 56 },
    { label: "W8", value: 64 },
  ],
  creditUsageTotal: {
    used: 60,
    total: 100,
    periodLabel: "29 July 20/100",
  },
  activity: [
    { label: "M", value: 22 },
    { label: "T", value: 28 },
    { label: "W", value: 35 },
    { label: "T", value: 32 },
    { label: "F", value: 44 },
    { label: "S", value: 48 },
    { label: "S", value: 56 },
  ],
  activitySummary: {
    trendPct: 3.4,
    periodLabel: "29 July 00:00",
    level: "High",
  },
}
