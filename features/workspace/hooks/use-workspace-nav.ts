"use client"

import * as React from "react"

import { mockWorkspaceNavEntries } from "@/features/workspace/data/mock-workspaces-nav"
import { useWorkspaces } from "@/features/workspace/hooks/use-workspaces"
import { workspaceCodeToSlug } from "@/features/workspace/lib/workspace-slug"
import type { NavSubItem } from "@/config/nav/types"

/**
 * Sidebar workspace children loaded from Workspace Management (API),
 * with a static catalog fallback for local development.
 */
export function useWorkspaceNavItems(): {
  items: NavSubItem[]
  isLoading: boolean
} {
  const { data, isLoading, isError } = useWorkspaces({
    page: 0,
    size: 100,
    sort: "name,asc",
  })

  const items = React.useMemo(() => {
    if (!isError && data?.items?.length) {
      return data.items.map((workspace) => ({
        label: workspace.name,
        href: `/workspaces/${workspaceCodeToSlug(workspace.code)}`,
        matchDescendants: true as const,
      }))
    }
    return mockWorkspaceNavEntries
  }, [data?.items, isError])

  return { items, isLoading }
}
