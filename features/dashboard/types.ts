export type RequestStatus = "in-progress" | "completed" | "draft" | "rejected"

export type RequestChannel = "FTP" | "API" | "WEB"

export type RequestSigner = {
  initials: string
  name: string
}

export type RequestStampDetailsKey = "JK" | "KA" | "MH" | "TN" | "DL"

export type Request = {
  id: string
  dateTime: string
  channel: RequestChannel
  documentsCount: number
  signers: RequestSigner[]
  stampDetailsKey: RequestStampDetailsKey
  amount: number | null
  partiesCount: number
  status: RequestStatus
  lastActionLabel: string
  lastActionAgo: string
}

export type DashboardStat = {
  id: "documents" | "esigned" | "estamped" | "draft"
  label: string
  value: number
  delta: number
}

export type DashboardStats = {
  totals: DashboardStat[]
  creditUsage: { label: string; value: number }[]
  creditUsageTotal: { used: number; total: number; periodLabel: string }
  activity: { label: string; value: number }[]
  activitySummary: { trendPct: number; periodLabel: string; level: "Low" | "Medium" | "High" }
}
