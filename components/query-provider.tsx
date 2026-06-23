"use client"

import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query"
import { useState, type ReactNode } from "react"

/**
 * QueryProvider — hosts the TanStack Query client for the app.
 *
 * A single QueryClient is created lazily per React tree (via useState) so
 * server and client halves never share the same instance and HMR doesn't wipe
 * the cache between renders.
 *
 * staleTime is 30s (Requirement 14.5) to reduce redundant API requests while
 * keeping data reasonably fresh.
 */
const QUERY_CLIENT_DEFAULTS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient(QUERY_CLIENT_DEFAULTS))
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
