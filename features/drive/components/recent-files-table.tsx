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
import { DriveDocumentNameCell } from "@/features/drive/components/drive-document-name-cell"
import { DriveTableRowActions } from "@/features/drive/components/drive-table-row-actions"
import { recentFileItems } from "@/features/drive/data/mock-dashboard"
import type { RecentFileItem } from "@/features/drive/data/mock-dashboard"
import type { DriveItemActionHandlers } from "@/features/drive/lib/drive-item-actions"
import { buildPerspectiveViewHref } from "@/features/drive/lib/perspective-view-entry"
import type { DriveItem, DriveSortDirection } from "@/features/drive/types"

const ROWS_PER_PAGE = 10

type RecentSortKey = "name" | "openedAt"

function compareItems(
  a: RecentFileItem,
  b: RecentFileItem,
  key: RecentSortKey,
  direction: DriveSortDirection
): number {
  const factor = direction === "asc" ? 1 : -1
  if (key === "name") {
    return a.name.localeCompare(b.name) * factor
  }
  return a.openedAt.localeCompare(b.openedAt) * factor
}

function toggleSort(
  currentKey: RecentSortKey,
  currentDirection: DriveSortDirection,
  nextKey: RecentSortKey
): { key: RecentSortKey; direction: DriveSortDirection } {
  if (currentKey !== nextKey) {
    return { key: nextKey, direction: "asc" }
  }
  return {
    key: nextKey,
    direction: currentDirection === "asc" ? "desc" : "asc",
  }
}

function getCategory(item: RecentFileItem) {
  return item.tag?.label ?? "--"
}

function toDriveItem(item: RecentFileItem, starred?: boolean): DriveItem {
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    category: getCategory(item),
    workspace: item.subtitle,
    createdAt: item.openedAt,
    fileSize: null,
    starred,
  }
}

export function RecentFilesTable() {
  const router = useRouter()
  const [items] = React.useState(recentFileItems)
  const [starredOverrides, setStarredOverrides] = React.useState<
    Record<string, boolean>
  >({})
  const [selectedId, setSelectedId] = React.useState<string>(items[0]?.id ?? "")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = React.useState<RecentSortKey>("name")
  const [sortDirection, setSortDirection] =
    React.useState<DriveSortDirection>("asc")
  const [page, setPage] = React.useState(1)
  const [goToPage, setGoToPage] = React.useState("")

  const sorted = React.useMemo(
    () =>
      [...items].sort((a, b) => compareItems(a, b, sortKey, sortDirection)),
    [items, sortKey, sortDirection]
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

  const handleSort = (key: RecentSortKey) => {
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
    (item: RecentFileItem): DriveItemActionHandlers => ({
      open: () => setSelectedId(item.id),
      preview: (target) => {
        router.push(buildPerspectiveViewHref(target))
      },
      "open-perspective": (target) => {
        router.push(buildPerspectiveViewHref(target))
      },
      "file-info": (target) => {
        setSelectedId(target.id)
      },
      share: () => {},
      download: () => {},
      star: (target) => {
        setStarredOverrides((current) => ({
          ...current,
          [target.id]: !current[target.id],
        }))
      },
    }),
    [router, setSelectedId]
  )

  return (
    <TableContainer>
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
                sortDirection={sortKey === "openedAt" ? sortDirection : false}
                onSort={() => handleSort("openedAt")}
              >
                Opened Date
              </TableSortHead>
              <TableHead className="w-[10%]">File Size</TableHead>
              <TableHead className="w-[188px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((item) => {
              const isSelected = selectedId === item.id
              const isChecked = selectedIds.has(item.id)
              const driveItem = toDriveItem(item, starredOverrides[item.id])
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
                    <DriveDocumentNameCell item={driveItem} />
                  </TableCell>
                  <TableCell className="py-2 text-muted-foreground">
                    {getCategory(item)}
                  </TableCell>
                  <TableCell className="py-2 text-muted-foreground">
                    {item.openedAt}
                  </TableCell>
                  <TableCell className="py-2 text-muted-foreground">--</TableCell>
                  <TableCell className="py-2 text-right">
                    <DriveTableRowActions
                      item={driveItem}
                      handlers={getItemActionHandlers(item)}
                    />
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
    </TableContainer>
  )
}
