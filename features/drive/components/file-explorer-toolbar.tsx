"use client"

import * as React from "react"
import {
  ArrowDownUp,
  Grid3x3,
  Info,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FolderTreeToggleIcon } from "@/features/drive/components/folder-tree-toggle-icon"
import {
  explorerFolderToggleClass,
  explorerSearchFieldClass,
  explorerSearchLeadingIconClass,
  explorerSearchShellClass,
  explorerSearchSubmitClass,
} from "@/features/drive/lib/explorer-layout"

type ExplorerViewMode = "list" | "grid"

type FileExplorerToolbarProps = {
  folderSearch: string
  onFolderSearchChange: (value: string) => void
  myFoldersOpen: boolean
  onToggleMyFolders: () => void
  certificationOpen: boolean
  onToggleCertification: () => void
}

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-border/80" aria-hidden />
}

export function FileExplorerToolbar({
  folderSearch,
  onFolderSearchChange,
  myFoldersOpen,
  onToggleMyFolders,
  certificationOpen,
  onToggleCertification,
}: FileExplorerToolbarProps) {
  const [viewMode, setViewMode] = React.useState<ExplorerViewMode>("list")

  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background px-3 py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
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

        <div className={explorerSearchShellClass}>
          <Search className={explorerSearchLeadingIconClass} aria-hidden />
          <Input
            type="search"
            value={folderSearch}
            onChange={(event) => onFolderSearchChange(event.target.value)}
            placeholder="Search in selected folder"
            className={explorerSearchFieldClass}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={explorerSearchSubmitClass}
            aria-label="Search folder"
          >
            <Search className="size-4" strokeWidth={2.25} aria-hidden />
          </Button>
        </div>
      </div>
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
            onClick={() => setViewMode("list")}
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
            onClick={() => setViewMode("grid")}
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
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-8 text-muted-foreground hover:text-foreground"
            aria-label="Filter"
          >
            <SlidersHorizontal className="size-4" />
          </Button>
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
