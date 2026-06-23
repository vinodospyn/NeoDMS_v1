"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  const [localSearch, setLocalSearch] = useState(searchTerm)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onSearchChange(value)
      }, 300)
    },
    [onSearchChange]
  )

  // Sync local state if parent resets searchTerm
  useEffect(() => {
    setLocalSearch(searchTerm)
  }, [searchTerm])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setLocalSearch(value)
    debouncedChange(value)
  }

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search workspaces..."
          value={localSearch}
          onChange={handleChange}
          className="pl-8"
        />
      </div>
      <Button onClick={onCreateClick}>
        <Plus className="size-4" data-icon="inline-start" />
        New Workspace
      </Button>
    </div>
  )
}
