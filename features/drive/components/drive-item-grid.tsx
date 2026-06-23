"use client"

import * as React from "react"

import { DriveItemGridCard, DRIVE_GRID_COLUMNS } from "@/features/drive/components/drive-item-grid-card"
import { DRIVE_GRID_GAP, DRIVE_GRID_PADDING } from "@/features/drive/lib/drive-grid-layout"
import type { DriveItem } from "@/features/drive/types"
import { cn } from "@/lib/utils"

type DriveItemGridProps<T extends DriveItem> = {
  items: T[]
  selectedId?: string
  onSelectedIdChange?: (id: string) => void
  selectedIds?: Set<string>
  onSelectedIdsChange?: React.Dispatch<React.SetStateAction<Set<string>>>
  getItemSubtitle?: (item: T) => string | undefined
  renderActions?: (item: T) => React.ReactNode
  className?: string
}

export function DriveItemGrid<T extends DriveItem>({
  items,
  selectedId,
  onSelectedIdChange,
  selectedIds,
  onSelectedIdsChange,
  getItemSubtitle,
  renderActions,
  className,
}: DriveItemGridProps<T>) {
  return (
    <div
      className={cn("grid", DRIVE_GRID_GAP, DRIVE_GRID_PADDING, className)}
      style={{
        gridTemplateColumns: `repeat(${DRIVE_GRID_COLUMNS}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item) => (
        <DriveItemGridCard
          key={item.id}
          item={item}
          subtitle={getItemSubtitle?.(item)}
          selected={selectedId === item.id}
          checked={selectedIds?.has(item.id)}
          onSelect={() => onSelectedIdChange?.(item.id)}
          onCheckedChange={
            onSelectedIdsChange
              ? (checked) => {
                  onSelectedIdsChange((prev) => {
                    const next = new Set(prev)
                    if (checked) next.add(item.id)
                    else next.delete(item.id)
                    return next
                  })
                }
              : undefined
          }
          actions={renderActions?.(item)}
        />
      ))}
    </div>
  )
}
