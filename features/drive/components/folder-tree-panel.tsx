"use client"

import * as React from "react"
import { ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { FolderNode } from "@/features/drive/data/mock-folder-tree"

type FolderTreePanelProps = {
  title?: string
  tree: FolderNode[]
  selectedId: string
  onSelectedIdChange: (id: string) => void
}

function FolderTreeRow({
  node,
  depth,
  expandedIds,
  onToggle,
  selectedId,
  onSelect,
}: {
  node: FolderNode
  depth: number
  expandedIds: Set<string>
  onToggle: (id: string) => void
  selectedId: string
  onSelect: (id: string) => void
}) {
  const hasChildren = Boolean(node.children?.length)
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id

  return (
    <div className="space-y-1">
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors",
          isSelected
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "hover:bg-muted/60"
        )}
        style={{ paddingLeft: 8 + depth * 14 }}
        onClick={() => onSelect(node.id)}
      >
        {hasChildren ? (
          <span
            className={cn(
              "grid size-5 place-items-center rounded-md text-muted-foreground",
              isSelected ? "text-sidebar-accent-foreground/80" : ""
            )}
            onClick={(e) => {
              e.stopPropagation()
              onToggle(node.id)
            }}
          >
            <ChevronRight
              className={cn("size-4 transition-transform", isExpanded ? "rotate-90" : "")}
              aria-hidden
            />
          </span>
        ) : (
          <span className="size-5" aria-hidden />
        )}

        <FileTypeIcon kind="folder" variant="compact" size="sm" />
        <span className="min-w-0 truncate">{node.label}</span>
      </button>

      {hasChildren && isExpanded
        ? node.children!.map((child) => (
            <FolderTreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))
        : null}
    </div>
  )
}

export function FolderTreePanel({
  title = "My Folders",
  tree,
  selectedId,
  onSelectedIdChange,
}: FolderTreePanelProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(["onboarding", "employees"])
  )

  const toggle = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-12 items-center justify-between px-3">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Close folders"
        >
          <X className="size-4" aria-hidden />
        </Button>
      </div>
      <ScrollArea className="min-h-0 flex-1 px-2 pb-3">
        <div className="space-y-1 pt-1">
          {tree.map((node) => (
            <FolderTreeRow
              key={node.id}
              node={node}
              depth={0}
              expandedIds={expandedIds}
              onToggle={toggle}
              selectedId={selectedId}
              onSelect={onSelectedIdChange}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

