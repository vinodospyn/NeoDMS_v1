"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Download, ExternalLink, MoreVertical, Share2, Star } from "lucide-react"

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
import { mockDriveItems } from "@/features/drive/data/mock-files"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { DriveItem, DriveSortDirection, DriveSortKey } from "@/features/drive/types"

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
  folderSearch?: string
  selectedId?: string
  onSelectedIdChange?: (id: string) => void
}

export function FileExplorerTable({
  embedded = false,
  folderSearch = "",
  selectedId: selectedIdProp,
  onSelectedIdChange,
}: FileExplorerTableProps) {
  const router = useRouter()
  const [items] = React.useState(mockDriveItems)
  const [selectedIdState, setSelectedIdState] = React.useState<string>("2")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = React.useState<DriveSortKey>("name")
  const [sortDirection, setSortDirection] =
    React.useState<DriveSortDirection>("asc")
  const [page, setPage] = React.useState(1)
  const [goToPage, setGoToPage] = React.useState("")
  const selectedId = selectedIdProp ?? selectedIdState

  const setSelectedId = React.useCallback(
    (id: string) => {
      setSelectedIdState(id)
      onSelectedIdChange?.(id)
    },
    [onSelectedIdChange]
  )

  const filtered = React.useMemo(() => {
    const term = folderSearch.trim().toLowerCase()
    if (!term) return items
    return items.filter((item) => item.name.toLowerCase().includes(term))
  }, [items, folderSearch])

  const sorted = React.useMemo(
    () =>
      [...filtered].sort((a, b) => compareItems(a, b, sortKey, sortDirection)),
    [filtered, sortKey, sortDirection]
  )

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const pageStart =
    sorted.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1
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

  const table = (
    <>
      <div className="min-h-0 w-full max-w-full flex-1 overflow-auto">
      <Table className="min-w-[960px] w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={allOnPageSelected}
                onCheckedChange={(value) => handleSelectAll(value === true)}
                aria-label="Select all on page"
              />
            </TableHead>
            <TableSortHead
              className="min-w-[200px]"
              sortDirection={sortKey === "name" ? sortDirection : false}
              onSort={() => handleSort("name")}
            >
              Name
            </TableSortHead>
            <TableHead className="w-[17%]">Category</TableHead>
            <TableHead className="w-[12%]">Workspace</TableHead>
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
                  className="py-2"
                  onClick={(event) => event.stopPropagation()}
                >
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
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2.5">
                    <FileTypeIcon
                      name={item.name}
                      explicitType={item.type}
                      variant="compact"
                      size="md"
                    />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-muted-foreground">
                  {item.category}
                </TableCell>
                <TableCell className="py-2 text-muted-foreground">
                  {item.workspace}
                </TableCell>
                <TableCell className="py-2 text-muted-foreground">
                  {item.createdAt}
                </TableCell>
                <TableCell className="py-2 text-muted-foreground">
                  {item.fileSize ?? "--"}
                </TableCell>
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
                    <TableRowAction type="button" aria-label="Download">
                      <Download className="size-4" />
                    </TableRowAction>
                    <TableRowAction
                      type="button"
                      aria-label="Open in perspective view"
                      onClick={() =>
                        router.push(`/perspective-view?id=${item.id}`)
                      }
                    >
                      <ExternalLink className="size-4" />
                    </TableRowAction>
                    <TableRowAction
                      type="button"
                      visibility="always"
                      aria-label="More actions"
                    >
                      <MoreVertical className="size-4" />
                    </TableRowAction>
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
                  className={safePage === 1 ? "pointer-events-none opacity-50" : ""}
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
                    safePage === totalPages ? "pointer-events-none opacity-50" : ""
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
    </>
  )

  if (embedded) {
    return (
      <div className="flex min-h-0 w-full max-w-full flex-1 flex-col overflow-hidden">
        {table}
      </div>
    )
  }

  return <TableContainer>{table}</TableContainer>
}
