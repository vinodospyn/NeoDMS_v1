import { useQuery, keepPreviousData } from "@tanstack/react-query"

import type { WorkspaceListParams } from "@/features/workspace/types"
import { listWorkspaces } from "@/features/workspace/services/workspace-service"

/**
 * React Query hook for fetching the paginated workspace list.
 * Uses keepPreviousData to maintain a smooth UX during page transitions.
 */
export function useWorkspaces(params: WorkspaceListParams) {
  return useQuery({
    queryKey: ["workspaces", params],
    queryFn: () => listWorkspaces(params),
    placeholderData: keepPreviousData,
  })
}
