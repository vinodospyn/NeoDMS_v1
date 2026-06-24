"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useWorkspaces } from "@/features/workspace/hooks/use-workspaces"
import { workspaceSettingsRoutes } from "@/features/workspace/lib/routes"
import { WorkspaceListTable } from "@/features/workspace/components/workspace-list-table"
import { WorkspaceListToolbar } from "@/features/workspace/components/workspace-list-toolbar"
import { WorkspaceDeleteDialog } from "@/features/workspace/components/workspace-delete-dialog"
import type {
  SortDirection,
  WorkspaceListParams,
  WorkspaceSortField,
  WorkspaceSummaryResponse,
} from "@/features/workspace/types"

type SortValue = `${WorkspaceSortField},${SortDirection}`

/**
 * Workspace list page component.
 * Composes the toolbar and table, managing pagination, sorting, and search state.
 */
export function WorkspaceListPage() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [size] = useState(20)
  const [sort, setSort] = useState<SortValue>("createdAt,desc")
  const [searchTerm, setSearchTerm] = useState("")

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<WorkspaceSummaryResponse | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const params: WorkspaceListParams = {
    page,
    size,
    sort,
    name: searchTerm || undefined,
  }

  const { data, isLoading } = useWorkspaces(params)

  function handleSearchChange(value: string) {
    setSearchTerm(value)
    setPage(0)
  }

  function handleSortChange(newSort: SortValue) {
    setSort(newSort)
    setPage(0)
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
  }

  function handleCreateClick() {
    router.push(workspaceSettingsRoutes.new)
  }

  function handleEdit(workspace: WorkspaceSummaryResponse) {
    router.push(workspaceSettingsRoutes.edit(workspace.id))
  }

  function handleDelete(workspace: WorkspaceSummaryResponse) {
    setDeleteTarget(workspace)
    setDeleteOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-1">
      <WorkspaceListToolbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCreateClick={handleCreateClick}
      />
      <div className="px-4 pb-4">
        <WorkspaceListTable
          items={data?.items ?? []}
          isLoading={isLoading}
          page={data?.page ?? 0}
          totalPages={data?.totalPages ?? 0}
          totalElements={data?.totalElements ?? 0}
          sort={sort}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {deleteTarget && (
        <WorkspaceDeleteDialog
          workspace={deleteTarget}
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open)
            if (!open) setDeleteTarget(null)
          }}
        />
      )}
    </div>
  )
}
