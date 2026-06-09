"use client"

import * as React from "react"
import { ChevronRight, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import {
  filterPerspectiveTree,
  perspectiveTreeRowSelectedClass,
} from "@/features/drive/lib/perspective-tree"

type PerspectiveTreePanelProps = {
  tree: PerspectiveTreeNode[]
  selectedId: string
  onSelectedIdChange: (id: string) => void
  expandedIds: Set<string>
  onExpandedIdsChange: (ids: Set<string>) => void
}

function PerspectiveTreeRow({
  node,
  depth,
  expandedIds,
  onToggle,
  selectedId,
  onSelect,
}: {
  node: PerspectiveTreeNode
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
    <div>
      <div
        className={cn(
          "flex w-full items-center gap-1 rounded-md py-1.5 pr-2 text-left text-sm transition-colors",
          isSelected
            ? perspectiveTreeRowSelectedClass
            : "text-foreground hover:bg-muted/50"
        )}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            onClick={() => onToggle(node.id)}
          >
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-150",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        ) : (
          <span className="size-5 shrink-0" aria-hidden />
        )}

        <button
          type="button"
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            isSelected && "text-primary"
          )}
          onClick={() => onSelect(node.id)}
        >
          <FileTypeIcon
            kind={node.kind}
            name={node.label}
            shared={node.shared}
            variant="compact"
            size="sm"
          />
          <span className="min-w-0 truncate">{node.label}</span>
        </button>
      </div>

      {hasChildren && isExpanded
        ? node.children!.map((child) => (
            <PerspectiveTreeRow
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

export function PerspectiveTreePanel({
  tree,
  selectedId,
  onSelectedIdChange,
  expandedIds,
  onExpandedIdsChange,
}: PerspectiveTreePanelProps) {
  const [search, setSearch] = React.useState("")
  const filteredTree = React.useMemo(
    () => filterPerspectiveTree(tree, search),
    [tree, search]
  )

  const toggle = React.useCallback(
    (id: string) => {
      onExpandedIdsChange(
        (() => {
          const next = new Set(expandedIds)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        })()
      )
    },
    [expandedIds, onExpandedIdsChange]
  )

  return (
    <aside className="flex h-full min-h-0 flex-col bg-background">
      <div className="shrink-0 p-3 pb-2">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search in selected folder"
            className="h-9 rounded-md bg-muted/30 pl-9 text-sm shadow-none"
            aria-label="Search in selected folder"
          />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-0.5 p-2">
          {filteredTree.map((node) => (
            <PerspectiveTreeRow
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
    </aside>
  )
}
