"use client"

import { Plus } from "lucide-react"

import { ToolbarSearch } from "@/components/common/toolbar-search"
import { Button } from "@/components/ui/button"

interface WorkspaceListToolbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onCreateClick?: () => void
}

/**
 * Toolbar for the workspace list page.
 * Includes a debounced search input and a "New Workspace" button.
 */
export function WorkspaceListToolbar({
  searchTerm,
  onSearchChange,
  onCreateClick,
}: WorkspaceListToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <ToolbarSearch
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search workspaces..."
        aria-label="Search workspaces"
        debounceMs={300}
      />
      <Button onClick={onCreateClick}>
        <Plus className="size-4" data-icon="inline-start" />
        New Workspace
      </Button>
    </div>
  )
}
