"use client"

import { mockRequests } from "@/features/dashboard/data/requests"
import type { Request } from "@/features/dashboard/types"

export type UseRequestsResult = {
  data: Request[]
  isLoading: boolean
  error: Error | null
}

/**
 * Returns the list of requests for the dashboard. Currently returns mock data
 * synchronously; swap the implementation to call the real API later without
 * touching consumers.
 */
export function useRequests(): UseRequestsResult {
  return {
    data: mockRequests,
    isLoading: false,
    error: null,
  }
}
