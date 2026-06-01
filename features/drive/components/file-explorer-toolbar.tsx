"use client"

import {
  ArrowDownUp,
  Filter,
  Grid3x3,
  Info,
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
    <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={folderSearch}
          onChange={(event) => onFolderSearchChange(event.target.value)}
          placeholder="Search in selected folder"
          className="h-9 bg-muted/40 pl-9"
        />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Sort"
        >
          <ArrowDownUp className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Filter"
        >
          <Filter className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Information"
        >
          <Info className="size-4" />
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
          className="text-muted-foreground"
          aria-label="Grid view"
        >
          <Grid3x3 className="size-4" />
        </Button>
        <Button type="button" size="sm" className="primary-button ml-1 h-9 gap-1.5 px-4">
          <Plus className="size-4" />
          New
        </Button>
      </div>
    </div>
  )
}
