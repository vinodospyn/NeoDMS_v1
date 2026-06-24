"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

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
  TableSortHead,
} from "@/components/ui/table"
import { mockDriveItems } from "@/features/drive/data/mock-files"
import { DriveDocumentNameCell } from "@/features/drive/components/drive-document-name-cell"
import { DriveGridCardActions } from "@/features/drive/components/drive-grid-card-actions"
import { DriveItemGrid } from "@/features/drive/components/drive-item-grid"
import { DriveTableRowActions } from "@/features/drive/components/drive-table-row-actions"
import type { DriveItemActionHandlers } from "@/features/drive/lib/drive-item-actions"
import { buildPerspectiveViewHref } from "@/features/drive/lib/perspective-view-entry"
import { explorerTableFilterColumns } from "@/features/drive/lib/explorer-table-columns"
import {
  filterItemsByColumns,
  type ColumnFilterState,
} from "@/features/drive/lib/table-column-filter"
import type {
  DriveItem,
  DriveSortDirection,
  DriveSortKey,
} from "@/features/drive/types"
import type { DriveViewMode } from "@/features/drive/types/view-mode"

const ROWS_PER_PAGE = 10

function compareItems(
  a: DriveItem,
  b: DriveItem,
  key: DriveSortKey,
  direction: DriveSortDirection
): number {
  const factor = direction === "asc" ? 1 : -1
  if (key === "name") {
    return a.name.localeCompare(b.name) * factor
  }
  return a.createdAt.localeCompare(b.createdAt) * factor
}

function toggleSort(
  currentKey: DriveSortKey,
  currentDirection: DriveSortDirection,
  nextKey: DriveSortKey
): { key: DriveSortKey; direction: DriveSortDirection } {
  if (currentKey !== nextKey) {
    return { key: nextKey, direction: "asc" }
  }
  return {
    key: nextKey,
    direction: currentDirection === "asc" ? "desc" : "asc",
  }
}

type FileExplorerTableProps = {
  /** When true, renders inside `FileExplorerPage` shell (no outer card). */
  embedded?: boolean
  items?: DriveItem[]
  folderSearch?: string
  columnFilters?: ColumnFilterState
  selectedId?: string
  onSelectedIdChange?: (id: string) => void
  onItemFileInfo?: (item: DriveItem) => void
  actionHandlers?: DriveItemActionHandlers
  viewMode?: DriveViewMode
}

export function FileExplorerTable({
  embedded = false,
  items: itemsProp,
  folderSearch = "",
  columnFilters = {},
  selectedId: selectedIdProp,
  onSelectedIdChange,
  onItemFileInfo,
  actionHandlers,
  viewMode = "list",
}: FileExplorerTableProps) {
  const router = useRouter()
  const [items, setItems] = React.useState(itemsProp ?? mockDriveItems)
  const [selectedIdState, setSelectedIdState] = React.useState<string>(
    () => (itemsProp ?? mockDriveItems)[0]?.id ?? "1"
  )
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = React.useState<DriveSortKey>("name")
  const [sortDirection, setSortDirection] =
    React.useState<DriveSortDirection>("asc")
  const [page, setPage] = React.useState(1)
  const [goToPage, setGoToPage] = React.useState("")
  const selectedId = selectedIdProp ?? selectedIdState

  React.useEffect(() => {
    if (itemsProp) {
      setItems(itemsProp)
      setSelectedIdState(itemsProp[0]?.id ?? "1")
      setSelectedIds(new Set())
      setPage(1)
    }
  }, [itemsProp])

  React.useEffect(() => {
    setPage(1)
  }, [folderSearch, columnFilters])

  const setSelectedId = React.useCallback(
    (id: string) => {
      setSelectedIdState(id)
      onSelectedIdChange?.(id)
    },
    [onSelectedIdChange]
  )

  const filtered = React.useMemo(() => {
    const term = folderSearch.trim().toLowerCase()
    const searched = !term
      ? items
      : items.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term)
        )

    return filterItemsByColumns(
      searched,
      explorerTableFilterColumns,
      columnFilters
    )
  }, [items, folderSearch, columnFilters])

  const sorted = React.useMemo(
    () =>
      [...filtered].sort((a, b) => compareItems(a, b, sortKey, sortDirection)),
    [filtered, sortKey, sortDirection]
  )

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

  const handleSort = (key: DriveSortKey) => {
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
    (item: DriveItem): DriveItemActionHandlers => ({
      open: () => {
        setSelectedId(item.id)
      },
      preview: (target) => {
        router.push(buildPerspectiveViewHref(target))
      },
      "open-perspective": (target) => {
        router.push(buildPerspectiveViewHref(target))
      },
      "file-info": (target) => {
        setSelectedId(target.id)
        onItemFileInfo?.(target)
      },
      share: (target) => {
        actionHandlers?.share?.(target)
      },
      download: (target) => {
        actionHandlers?.download?.(target)
      },
      ...actionHandlers,
      star: (target) => {
        setItems((current) =>
          current.map((entry) =>
            entry.id === target.id
              ? { ...entry, starred: !entry.starred }
              : entry
          )
        )
        actionHandlers?.star?.(target)
      },
    }),
    [actionHandlers, onItemFileInfo, router, setSelectedId]
  )

  const paginationFooter = (
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
  )

  const gridView = (
    <>
      <div className="min-h-0 w-full max-w-full flex-1 overflow-auto">
        <DriveItemGrid
          items={paginated}
          selectedId={selectedId}
          onSelectedIdChange={setSelectedId}
          selectedIds={selectedIds}
          onSelectedIdsChange={setSelectedIds}
          renderActions={(item) => (
            <DriveGridCardActions
              item={item}
              handlers={getItemActionHandlers(item)}
            />
          )}
        />
      </div>
      {paginationFooter}
    </>
  )

  const table = (
    <>
      <div className="min-h-0 w-full max-w-full flex-1 overflow-auto">
        <Table className="w-full min-w-[960px]">
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
              <TableSortHead
                className="min-w-[200px]"
                sortDirection={sortKey === "name" ? sortDirection : false}
                onSort={() => handleSort("name")}
              >
                Name
              </TableSortHead>
              <TableHead className="w-[17%]">Category</TableHead>

              <TableSortHead
                className="w-[20%]"
                sortDirection={sortKey === "createdAt" ? sortDirection : false}
                onSort={() => handleSort("createdAt")}
              >
                Created Date
              </TableSortHead>
              <TableHead className="w-[10%]">File Size</TableHead>
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
                  <TableCell className="py-2">
                    <DriveDocumentNameCell item={item} />
                  </TableCell>
                  <TableCell className="py-2 text-muted-foreground">
                    {item.category}
                  </TableCell>

                  <TableCell className="py-2 text-muted-foreground">
                    {item.createdAt}
                  </TableCell>
                  <TableCell className="py-2 text-muted-foreground">
                    {item.fileSize ?? "--"}
                  </TableCell>
                  <TableCell className="py-2 text-right">
                    <DriveTableRowActions
                      item={item}
                      handlers={getItemActionHandlers(item)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {paginationFooter}
    </>
  )

  const content = viewMode === "grid" ? gridView : table

  if (embedded) {
    return <TableContainer variant="flat">{content}</TableContainer>
  }

  return <TableContainer>{content}</TableContainer>
}
