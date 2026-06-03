"use client"

import {
  ArrowDownUp,
  Filter,
  Grid3x3,
  List,
  Plus,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FileExplorerToolbarProps = {
  folderSearch: string
  onFolderSearchChange: (value: string) => void
}

export function FileExplorerToolbar({
  folderSearch,
  onFolderSearchChange,
}: FileExplorerToolbarProps) {
  return (
    <div className="flex shrink-0 flex-col gap-2.5 border-b border-border/60 bg-background px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={folderSearch}
          onChange={(event) => onFolderSearchChange(event.target.value)}
          placeholder="Search in selected folder"
          className="drive-search-input h-9 border-transparent pl-9 shadow-none"
        />
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Sort"
        >
          <ArrowDownUp className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Filter"
        >
          <Filter className="size-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="bg-muted text-foreground"
          aria-label="List view"
        >
          <List className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Grid view"
        >
          <Grid3x3 className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          className="primary-button ml-1 h-9 gap-1.5 px-4"
        >
          <Plus className="size-4" />
          New
        </Button>
      </div>
    </div>
  )
}
