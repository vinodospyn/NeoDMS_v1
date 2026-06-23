"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Download,
  ExternalLink,
  Share2,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooterBar,
  TableHead,
  TableHeader,
  TableRow,
  TableRowAction,
  TableRowActions,
  TableSortHead,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DriveItemActionsMenu } from "@/features/drive/components/drive-item-actions-menu"
import type { DriveItemActionHandlers } from "@/features/drive/lib/drive-item-actions"
import { isFolderKind } from "@/features/drive/lib/perspective-tree"
import type { DriveItem } from "@/features/drive/types"
import type {
  DriveListColumn,
  DriveListSortDirection,
} from "@/features/drive/types/drive-list"

const ROWS_PER_PAGE = 10

function toggleSort(
  currentKey: string,
  currentDirection: DriveListSortDirection,
  nextKey: string
): { key: string; direction: DriveListSortDirection } {
  if (currentKey !== nextKey) {
    return { key: nextKey, direction: "asc" }
  }
  return {
    key: nextKey,
    direction: currentDirection === "asc" ? "desc" : "asc",
  }
}

type DriveListTableProps<T extends DriveItem> = {
  items: T[]
  columns: DriveListColumn<T>[]
  defaultSortColumnId: string
  searchTerm?: string
  typeFilter?: string
  minTableWidth?: string
  selectedId?: string
  onSelectedIdChange?: (id: string) => void
  onItemFileInfo?: (item: T) => void
  actionHandlers?: DriveItemActionHandlers
  selectedIds?: Set<string>
  onSelectedIdsChange?: React.Dispatch<React.SetStateAction<Set<string>>>
}

export function DriveListTable<T extends DriveItem>({
  items,
  columns,
  defaultSortColumnId,
  searchTerm = "",
  typeFilter = "all",
  minTableWidth = "1100px",
  selectedId: selectedIdProp,
  onSelectedIdChange,
  onItemFileInfo,
  actionHandlers,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
}: DriveListTableProps<T>) {
  const router = useRouter()
  const [selectedIdState, setSelectedIdState] = React.useState<string>("")
  const [selectedIdsState, setSelectedIdsState] = React.useState<Set<string>>(
    new Set()
  )
  const [sortKey, setSortKey] = React.useState(defaultSortColumnId)
  const [sortDirection, setSortDirection] =
    React.useState<DriveListSortDirection>("asc")
  const [page, setPage] = React.useState(1)
  const [goToPage, setGoToPage] = React.useState("")

  const selectedId = selectedIdProp ?? selectedIdState
  const selectedIds = selectedIdsProp ?? selectedIdsState
  const setSelectedIds = onSelectedIdsChange ?? setSelectedIdsState

  const setSelectedId = React.useCallback(
    (id: string) => {
      setSelectedIdState(id)
      onSelectedIdChange?.(id)
    },
    [onSelectedIdChange]
  )

  const filtered = React.useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      const matchesType = typeFilter === "all" || item.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [items, searchTerm, typeFilter])

  const sortColumn = columns.find((column) => column.id === sortKey)

  const sorted = React.useMemo(() => {
    const getValue =
      sortColumn?.getSortValue ??
      ((item: T) => {
        if (sortKey === "name") return item.name
        return item.createdAt
      })

    return [...filtered].sort((a, b) => {
      const factor = sortDirection === "asc" ? 1 : -1
      return getValue(a).localeCompare(getValue(b)) * factor
    })
  }, [filtered, sortColumn, sortDirection, sortKey])

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const pageStart = sorted.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1
  const pageEnd = Math.min(safePage * ROWS_PER_PAGE, sorted.length)

  const paginated = React.useMemo(() => {
    const start = (safePage - 1) * ROWS_PER_PAGE
    return sorted.slice(start, start + ROWS_PER_PAGE)
  }, [sorted, safePage])

  const allOnPageSelected =
    paginated.length > 0 && paginated.every((item) => selectedIds.has(item.id))

  const handleSort = (key: string) => {
    const next = toggleSort(sortKey, sortDirection, key)
    setSortKey(next.key)
    setSortDirection(next.direction)
    setPage(1)
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) {
        paginated.forEach((item) => next.add(item.id))
      } else {
        paginated.forEach((item) => next.delete(item.id))
      }
      return next
    })
  }

  const handleGoToPage = () => {
    const parsed = Number.parseInt(goToPage, 10)
    if (!Number.isFinite(parsed)) return
    setPage(Math.min(Math.max(parsed, 1), totalPages))
    setGoToPage("")
  }

  const getItemActionHandlers = React.useCallback(
    (item: T): DriveItemActionHandlers => ({
      open: () => setSelectedId(item.id),
      preview: (target) => {
        router.push(`/perspective-view?id=${target.id}`)
      },
      "open-perspective": (target) => {
        router.push(`/perspective-view?id=${target.id}`)
      },
      "file-info": (target) => {
        setSelectedId(target.id)
        onItemFileInfo?.(target as T)
      },
      ...actionHandlers,
    }),
    [actionHandlers, onItemFileInfo, router, setSelectedId]
  )

  return (
    <div className="flex min-h-0 w-full max-w-full flex-1 flex-col overflow-hidden bg-background">
      <div className="min-h-0 w-full max-w-full flex-1 overflow-auto">
        <Table className="w-full" style={{ minWidth: minTableWidth }}>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">
                <div className="flex items-center">
                  <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={(value) => handleSelectAll(value === true)}
                    aria-label="Select all on page"
                  />
                </div>
              </TableHead>
              {columns.map((column) =>
                column.sortable ? (
                  <TableSortHead
                    key={column.id}
                    className={column.className}
                    sortDirection={
                      sortKey === column.id ? sortDirection : false
                    }
                    onSort={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortHead>
                ) : (
                  <TableHead key={column.id} className={column.className}>
                    {column.label}
                  </TableHead>
                )
              )}
              <TableHead className="w-[188px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((item) => {
              const isSelected = selectedId === item.id
              const isChecked = selectedIds.has(item.id)
              return (
                <TableRow
                  key={item.id}
                  data-state={isSelected ? "selected" : undefined}
                  className="h-11 cursor-pointer"
                  onClick={() => setSelectedId(item.id)}
                >
                  <TableCell
                    className="pl-6"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(value) => {
                          setSelectedIds((prev) => {
                            const next = new Set(prev)
                            if (value === true) next.add(item.id)
                            else next.delete(item.id)
                            return next
                          })
                        }}
                        aria-label={`Select ${item.name}`}
                      />
                    </div>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} className="py-2">
                      {column.render(item)}
                    </TableCell>
                  ))}
                  <TableCell
                    className="py-2 text-right"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <TableRowActions>
                      <TableRowAction
                        type="button"
                        aria-label={item.starred ? "Unstar" : "Star"}
                      >
                        <Star
                          className={cn(
                            "size-4",
                            item.starred
                              ? "fill-amber-400 text-amber-400"
                              : "opacity-70"
                          )}
                        />
                      </TableRowAction>
                      <TableRowAction type="button" aria-label="Share">
                        <Share2 className="size-4" />
                      </TableRowAction>
                      {!isFolderKind(item.type) ? (
                        <TableRowAction type="button" aria-label="Download">
                          <Download className="size-4" />
                        </TableRowAction>
                      ) : null}
                      {!isFolderKind(item.type) ? (
                        <TableRowAction
                          type="button"
                          aria-label="Open in perspective view"
                          onClick={() =>
                            router.push(`/perspective-view?id=${item.id}`)
                          }
                        >
                          <ExternalLink className="size-4" />
                        </TableRowAction>
                      ) : null}
                      <DriveItemActionsMenu
                        item={item}
                        handlers={getItemActionHandlers(item)}
                      />
                    </TableRowActions>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <TableFooterBar className="mt-auto shrink-0 border-t border-border/60 bg-background px-4 py-2.5">
        <p className="text-sm text-muted-foreground">
          Showing {pageStart}-{pageEnd} of {sorted.length}
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((current) => Math.max(current - 1, 1))
                  }}
                  aria-disabled={safePage === 1}
                  className={
                    safePage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-sm text-muted-foreground">
                  {safePage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((current) => Math.min(current + 1, totalPages))
                  }}
                  aria-disabled={safePage === totalPages}
                  className={
                    safePage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Go to page</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={goToPage}
              onChange={(event) => setGoToPage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleGoToPage()
              }}
              className="h-9 w-16 px-2 text-center"
              aria-label="Go to page number"
            />
            <Button
              type="button"
              size="sm"
              className="primary-button h-9 px-4"
              onClick={handleGoToPage}
            >
              Go
            </Button>
          </div>
        </div>
      </TableFooterBar>
    </div>
  )
}

export function DriveListTableContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <TableContainer variant="flat">{children}</TableContainer>
}
