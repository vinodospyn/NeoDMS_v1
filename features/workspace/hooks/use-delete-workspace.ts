import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteWorkspace } from "@/features/workspace/services/workspace-service"

export function useDeleteWorkspace() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
  })
}
