"use client"

import * as React from "react"
import {
  ArrowDownUp,
  Download,
  Grid3x3,
  Info,
  List,
  RotateCcw,
  Share2,
  Star,
  Trash2,
} from "lucide-react"

import { ToolbarSearch } from "@/components/common/toolbar-search"
import { TableColumnFilter } from "@/components/common/table-column-filter"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type {
  ColumnFilterSection,
  ColumnFilterState,
} from "@/features/drive/lib/table-column-filter"
import type { DriveViewMode } from "@/features/drive/types/view-mode"

export type DriveListBulkVariant = "default" | "favorites" | "trash"

type DriveListToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  selectedCount: number
  bulkVariant?: DriveListBulkVariant
  filterSections: ColumnFilterSection[]
  columnFilters: ColumnFilterState
  onColumnFiltersChange: (filters: ColumnFilterState) => void
  quickViewOpen: boolean
  onToggleQuickView: () => void
  viewMode: DriveViewMode
  onViewModeChange: (mode: DriveViewMode) => void
}

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-border/80" aria-hidden />
}

export function DriveListToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search documents",
  selectedCount,
  bulkVariant = "default",
  filterSections,
  columnFilters,
  onColumnFiltersChange,
  quickViewOpen,
  onToggleQuickView,
  viewMode,
  onViewModeChange,
}: DriveListToolbarProps) {
  return (
    <div className="flex shrink-0 flex-col border-b border-border/60 bg-background">
      {selectedCount > 0 ? (
        <div className="flex items-center gap-3 border-b border-border/50 bg-muted/20 px-4 py-2">
          <span className="text-sm font-medium text-foreground">
            {selectedCount} selected
          </span>
          {bulkVariant === "trash" ? (
            <>
              <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5">
                <RotateCcw className="size-3.5" />
                Restore
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
                Delete permanently
              </Button>
            </>
          ) : bulkVariant === "favorites" ? (
            <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5">
              <Star className="size-3.5" />
              Remove from favorites
            </Button>
          ) : (
            <>
              <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5">
                <Download className="size-3.5" />
                Download
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5">
                <Share2 className="size-3.5" />
                Share
              </Button>
            </>
          )}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <ToolbarSearch
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="flex shrink-0 items-center rounded-lg border border-border/60 bg-muted/25 p-0.5"
            role="group"
            aria-label="View mode"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                "size-7 rounded-md",
                viewMode === "list"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              onClick={() => onViewModeChange("list")}
            >
              <List className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                "size-7 rounded-md",
                viewMode === "grid"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              onClick={() => onViewModeChange("grid")}
            >
              <Grid3x3 className="size-4" />
            </Button>
          </div>

          <div className="flex shrink-0 items-center">
            <ToolbarDivider />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-8 text-muted-foreground hover:text-foreground"
              aria-label="Sort"
            >
              <ArrowDownUp className="size-4" />
            </Button>
            <ToolbarDivider />
            <TableColumnFilter
              sections={filterSections}
              filters={columnFilters}
              onFiltersChange={onColumnFiltersChange}
            />
            <ToolbarDivider />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                "size-8 transition-all duration-200",
                quickViewOpen
                  ? "bg-primary/10 text-primary ring-2 ring-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={quickViewOpen ? "Close quick view" : "Open quick view"}
              aria-pressed={quickViewOpen}
              aria-expanded={quickViewOpen}
              onClick={onToggleQuickView}
            >
              <Info className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
