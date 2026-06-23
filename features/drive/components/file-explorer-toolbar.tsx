"use client"

import * as React from "react"
import {
  ArrowDownUp,
  Grid3x3,
  Info,
  List,
} from "lucide-react"

import { TableColumnFilter } from "@/components/common/table-column-filter"
import { ToolbarSearch } from "@/components/common/toolbar-search"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FolderTreeToggleIcon } from "@/features/drive/components/folder-tree-toggle-icon"
import { explorerFolderToggleClass } from "@/features/drive/lib/explorer-layout"
import {
  DRIVE_GRID_GAP,
  driveExplorerChromeRowClass,
} from "@/features/drive/lib/drive-grid-layout"
import type {
  ColumnFilterSection,
  ColumnFilterState,
} from "@/features/drive/lib/table-column-filter"
import type { DriveViewMode } from "@/features/drive/types/view-mode"

type FileExplorerToolbarProps = {
  folderSearch: string
  onFolderSearchChange: (value: string) => void
  filterSections: ColumnFilterSection[]
  columnFilters: ColumnFilterState
  onColumnFiltersChange: (filters: ColumnFilterState) => void
  myFoldersOpen: boolean
  onToggleMyFolders: () => void
  certificationOpen: boolean
  onToggleCertification: () => void
  viewMode: DriveViewMode
  onViewModeChange: (mode: DriveViewMode) => void
}

function ToolbarDivider() {
  return <span className="mx-2 h-5 w-px shrink-0 bg-border/80" aria-hidden />
}

export function FileExplorerToolbar({
  folderSearch,
  onFolderSearchChange,
  filterSections,
  columnFilters,
  onColumnFiltersChange,
  myFoldersOpen,
  onToggleMyFolders,
  certificationOpen,
  onToggleCertification,
  viewMode,
  onViewModeChange,
}: FileExplorerToolbarProps) {
  return (
    <div className={cn(driveExplorerChromeRowClass, "justify-between")}>
      <div className={cn("flex min-w-0 items-center", DRIVE_GRID_GAP)}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            explorerFolderToggleClass,
            myFoldersOpen && "ring-2 ring-primary/20"
          )}
          aria-label={myFoldersOpen ? "Close My Folders" : "Open My Folders"}
          aria-pressed={myFoldersOpen}
          aria-expanded={myFoldersOpen}
          onClick={onToggleMyFolders}
        >
          <FolderTreeToggleIcon />
        </Button>

        <ToolbarSearch
          value={folderSearch}
          onChange={onFolderSearchChange}
          placeholder="Search in selected folder"
          aria-label="Search in selected folder"
        />
      </div>
      <div className={cn("flex shrink-0 items-center", DRIVE_GRID_GAP)}>
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
              certificationOpen
                ? "bg-primary/10 text-primary ring-2 ring-primary/20"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={
              certificationOpen ? "Close quick view" : "Open quick view"
            }
            aria-pressed={certificationOpen}
            aria-expanded={certificationOpen}
            onClick={onToggleCertification}
          >
            <Info className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
