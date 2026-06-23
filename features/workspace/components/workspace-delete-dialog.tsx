"use client"

import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteWorkspace } from "@/features/workspace/hooks/use-delete-workspace"
import { getErrorMessage } from "@/features/workspace/services/workspace-errors"

interface WorkspaceDeleteDialogProps {
  workspace: { id: string; name: string; isDefault?: boolean }
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Confirmation dialog for deleting a workspace.
 * Uses cache invalidation via the mutation hook to refresh the list on success.
 */
export function WorkspaceDeleteDialog({
  workspace,
  open,
  onOpenChange,
}: WorkspaceDeleteDialogProps) {
  const deleteMutation = useDeleteWorkspace()

  function handleDelete() {
    deleteMutation.mutate(workspace.id, {
      onSuccess: () => {
        onOpenChange(false)
        toast.success("Workspace deleted")
      },
      onError: (error) => {
        toast.error(getErrorMessage(error))
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Workspace</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{workspace.name}&quot;? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
