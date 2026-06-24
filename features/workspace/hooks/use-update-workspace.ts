import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateWorkspace } from "@/features/workspace/services/workspace-service"
import type { WorkspaceUpdateRequest } from "@/features/workspace/types"

export function useUpdateWorkspace(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: WorkspaceUpdateRequest) => updateWorkspace(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", id] })
    },
  })
}
