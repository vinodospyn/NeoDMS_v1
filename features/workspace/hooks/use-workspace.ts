import { useQuery } from "@tanstack/react-query"
import { getWorkspace } from "@/features/workspace/services/workspace-service"

export function useWorkspace(id: string) {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: () => getWorkspace(id),
    enabled: !!id,
  })
}
