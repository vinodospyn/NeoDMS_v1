"use client"

import * as React from "react"
import { ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { FolderNode } from "@/features/drive/data/mock-folder-tree"
import {
  explorerFolderRowSelectedClass,
  explorerPanelHeaderClass,
} from "@/features/drive/lib/explorer-layout"

type FolderTreePanelProps = {
  title?: string
  tree: FolderNode[]
  selectedId: string
  onSelectedIdChange: (id: string) => void
  onClose?: () => void
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
    <div className="space-y-0.5">
      <div
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left text-sm transition-colors",
          isSelected
            ? explorerFolderRowSelectedClass
            : "text-foreground hover:bg-muted/50"
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        {hasChildren ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-5 shrink-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            onClick={() => onToggle(node.id)}
          >
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-150",
                isExpanded && "rotate-90"
              )}
              aria-hidden
            />
          </Button>
        ) : (
          <span className="size-5 shrink-0" aria-hidden />
        )}

        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          onClick={() => onSelect(node.id)}
        >
          <FileTypeIcon kind="folder" variant="compact" size="sm" />
          <span className="min-w-0 truncate">{node.label}</span>
        </button>
      </div>

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
  onClose,
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
    <div className="flex h-full flex-col bg-background">
      <div className={explorerPanelHeaderClass}>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close My Folders"
          onClick={onClose}
        >
          <X className="size-4" aria-hidden />
        </Button>
      </div>
      <ScrollArea className="min-h-0 flex-1 px-2 pb-3">
        <div className="space-y-0.5 py-2">
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
