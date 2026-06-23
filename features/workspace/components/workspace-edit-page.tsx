"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Skeleton } from "@/components/ui/skeleton"
import { WorkspaceForm } from "@/features/workspace/components/workspace-form"
import { useWorkspace } from "@/features/workspace/hooks/use-workspace"
import { useUpdateWorkspace } from "@/features/workspace/hooks/use-update-workspace"
import { WorkspaceApiError, getErrorMessage } from "@/features/workspace/services/workspace-errors"

interface WorkspaceEditPageProps {
  workspaceId: string
}

/**
 * Page component for editing an existing workspace.
 * Fetches workspace data, shows loading skeleton, handles submission.
 */
export function WorkspaceEditPage({ workspaceId }: WorkspaceEditPageProps) {
  const router = useRouter()
  const { data: workspace, isLoading, isError } = useWorkspace(workspaceId)
  const updateMutation = useUpdateWorkspace(workspaceId)

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-lg space-y-4 px-4 py-6">
        <Skeleton className="h-7 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    )
  }

  if (isError || !workspace) {
    toast.error("Workspace not found")
    router.push("/workspaces")
    return null
  }

  function handleSubmit(data: { code?: string; name?: string; description?: string }) {
    updateMutation.mutate(
      { name: data.name, description: data.description },
      {
        onSuccess: () => {
          toast.success("Workspace updated")
          router.push("/workspaces")
        },
        onError: (error) => {
          if (error instanceof WorkspaceApiError && error.status === 404) {
            toast.error("Workspace not found")
            router.push("/workspaces")
          } else {
            toast.error(getErrorMessage(error))
          }
        },
      }
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      <h1 className="mb-6 text-xl font-semibold">Edit Workspace</h1>
      <WorkspaceForm
        mode="edit"
        defaultValues={{
          code: workspace.code,
          name: workspace.name,
          description: workspace.description ?? "",
        }}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        onCancel={() => router.push("/workspaces")}
      />
    </div>
  )
}
