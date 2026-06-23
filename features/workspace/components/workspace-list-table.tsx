"use client"

import { format } from "date-fns"
import { ChevronLeft, ChevronRight, MoreHorizontal, Pencil, Trash2, UserPlus, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooterBar,
  TableHead,
  TableHeader,
  TableRow,
  TableSortHead,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type {
  SortDirection,
  WorkspaceSortField,
  WorkspaceSummaryResponse,
} from "@/features/workspace/types"

type SortValue = `${WorkspaceSortField},${SortDirection}`

interface WorkspaceListTableProps {
  items: WorkspaceSummaryResponse[]
  isLoading: boolean
  page: number
  totalPages: number
  totalElements: number
  sort: SortValue
  onPageChange: (page: number) => void
  onSortChange: (sort: SortValue) => void
  onEdit?: (workspace: WorkspaceSummaryResponse) => void
  onDelete?: (workspace: WorkspaceSummaryResponse) => void
}

/** Parse the current sort string into field and direction. */
function parseSort(sort?: SortValue): { field?: WorkspaceSortField; dir?: SortDirection } {
  if (!sort) return {}
  const [field, dir] = sort.split(",") as [WorkspaceSortField, SortDirection]
  return { field, dir }
}

export function WorkspaceListTable({
  items,
  isLoading,
  page,
  totalPages,
  totalElements,
  sort,
  onPageChange,
  onSortChange,
  onEdit,
  onDelete,
}: WorkspaceListTableProps) {
  function handleSort(field: WorkspaceSortField) {
    const { field: currentField, dir: currentDir } = parseSort(sort)
    const nextDir: SortDirection =
      currentField === field && currentDir === "asc" ? "desc" : "asc"
    onSortChange(`${field},${nextDir}`)
  }

  function getSortDirection(
    field: WorkspaceSortField
  ): "asc" | "desc" | false {
    const { field: currentField, dir } = parseSort(sort)
    if (currentField === field) return dir ?? false
    return false
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortHead
              sortDirection={getSortDirection("code")}
              onSort={() => handleSort("code")}
            >
              Code
            </TableSortHead>
            <TableSortHead
              sortDirection={getSortDirection("name")}
              onSort={() => handleSort("name")}
            >
              Name
            </TableSortHead>
            <TableHead>Description</TableHead>
            <TableHead>Owner</TableHead>
            <TableSortHead
              sortDirection={getSortDirection("createdAt")}
              onSort={() => handleSort("createdAt")}
            >
              Created At
            </TableSortHead>
            <TableHead className="w-10">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                </TableRow>
              ))
            : items.map((workspace) => (
                <TableRow key={workspace.id}>
                  <TableCell className="font-mono text-xs">
                    {workspace.code}
                  </TableCell>
                  <TableCell>{workspace.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {workspace.description ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {workspace.ownerId ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(workspace.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label="Actions">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(workspace)}>
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(workspace)}
                          disabled={workspace.isDefault || workspace.isDeleteAllowed === false}
                          variant="destructive"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenuItem disabled>
                                <UserPlus className="size-4" />
                                Assign Owner
                              </DropdownMenuItem>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              Available after IAM integration.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenuItem disabled>
                                <UserCog className="size-4" />
                                Change Owner
                              </DropdownMenuItem>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              Available after IAM integration.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          {!isLoading && items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No workspaces found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TableFooterBar>
        <p className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.max(totalPages, 1)} &middot;{" "}
          {totalElements} item{totalElements !== 1 ? "s" : ""} total
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page <= 0}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page >= totalPages - 1}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </TableFooterBar>
    </TableContainer>
  )
}
