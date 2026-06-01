"use client"

import { mockDashboardStats } from "@/features/dashboard/data/stats"
import type { DashboardStats } from "@/features/dashboard/types"

export type UseDashboardStatsResult = {
  data: DashboardStats
  isLoading: boolean
  error: Error | null
}

/**
 * Returns the aggregated KPIs and chart series for the dashboard. Mock now,
 * real backend later.
 */
export function useDashboardStats(): UseDashboardStatsResult {
  return {
    data: mockDashboardStats,
    isLoading: false,
    error: null,
  }
}
