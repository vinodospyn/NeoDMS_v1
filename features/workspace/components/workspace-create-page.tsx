"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { WorkspaceForm } from "@/features/workspace/components/workspace-form"
import { useCreateWorkspace } from "@/features/workspace/hooks/use-create-workspace"
import { workspaceSettingsRoutes } from "@/features/workspace/lib/routes"
import { WorkspaceApiError } from "@/features/workspace/services/workspace-errors"
import { getErrorMessage } from "@/features/workspace/services/workspace-errors"

/**
 * Page component for creating a new workspace.
 * Handles submission, server-side validation errors, and navigation.
 */
export function WorkspaceCreatePage() {
  const router = useRouter()
  const createMutation = useCreateWorkspace()
  const [serverError, setServerError] = useState<{ field: string; message: string } | undefined>()

  function handleSubmit(data: { code?: string; name?: string; description?: string }) {
    setServerError(undefined)
    createMutation.mutate(
      { code: data.code!, name: data.name!, description: data.description },
      {
        onSuccess: () => {
          toast.success("Workspace created")
          router.push(workspaceSettingsRoutes.list)
        },
        onError: (error) => {
          if (
            error instanceof WorkspaceApiError &&
            error.errorCode === "WORKSPACE_CODE_EXISTS"
          ) {
            setServerError({ field: "code", message: getErrorMessage(error) })
          } else {
            toast.error(getErrorMessage(error))
          }
        },
      }
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      <h1 className="mb-6 text-xl font-semibold">Create Workspace</h1>
      <WorkspaceForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        onCancel={() => router.push(workspaceSettingsRoutes.list)}
        serverError={serverError}
      />
    </div>
  )
}
