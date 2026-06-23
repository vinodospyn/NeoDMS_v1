"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CertificationDrawer } from "@/features/drive/components/certification-drawer"
import {
  DriveListTable,
  DriveListTableContainer,
} from "@/features/drive/components/drive-list-table"
import {
  DriveListToolbar,
  type DriveListBulkVariant,
} from "@/features/drive/components/drive-list-toolbar"
import {
  CERTIFICATION_DRAWER_WIDTH_PX,
  EXPLORER_DRAWER_EASE,
  EXPLORER_DRAWER_TRANSITION_MS,
  explorerDrawerEdgeRightClass,
} from "@/features/drive/lib/explorer-layout"
import type { DriveFileKind } from "@/features/drive/lib/file-types"
import type { DriveItem } from "@/features/drive/types"
import type { DriveListColumn } from "@/features/drive/types/drive-list"

type DriveListPageProps<T extends DriveItem> = {
  items: T[]
  columns: DriveListColumn<T>[]
  defaultSortColumnId?: string
  searchPlaceholder?: string
  bulkVariant?: DriveListBulkVariant
  minTableWidth?: string
}

export function DriveListPage<T extends DriveItem>({
  items,
  columns,
  defaultSortColumnId = "name",
  searchPlaceholder,
  bulkVariant = "default",
  minTableWidth,
}: DriveListPageProps<T>) {
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<DriveFileKind | "all">(
    "all"
  )
  const [selectedItemId, setSelectedItemId] = React.useState(
    () => items[0]?.id ?? ""
  )
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [quickViewOpen, setQuickViewOpen] = React.useState(false)

  const selectedItem = React.useMemo(
    () => items.find((item) => item.id === selectedItemId) ?? null,
    [items, selectedItemId]
  )

  const gridTemplateColumns = quickViewOpen
    ? `minmax(0, 1fr) ${CERTIFICATION_DRAWER_WIDTH_PX}px`
    : "minmax(0, 1fr) 0px"

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div
        className="grid h-full min-h-0 w-full overflow-hidden"
        style={{
          gridTemplateColumns,
          transition: `grid-template-columns ${EXPLORER_DRAWER_TRANSITION_MS}ms ${EXPLORER_DRAWER_EASE}`,
        }}
      >
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          <DriveListToolbar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder={searchPlaceholder}
            selectedCount={selectedIds.size}
            bulkVariant={bulkVariant}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            quickViewOpen={quickViewOpen}
            onToggleQuickView={() => setQuickViewOpen((open) => !open)}
          />
          <DriveListTableContainer>
            <DriveListTable
              items={items}
              columns={columns}
              defaultSortColumnId={defaultSortColumnId}
              searchTerm={search}
              typeFilter={typeFilter}
              minTableWidth={minTableWidth}
              selectedId={selectedItemId}
              onSelectedIdChange={setSelectedItemId}
              onItemFileInfo={() => setQuickViewOpen(true)}
              selectedIds={selectedIds}
              onSelectedIdsChange={setSelectedIds}
            />
          </DriveListTableContainer>
        </div>

        <div
          className={cn(
            "min-h-0 min-w-0 overflow-hidden bg-background",
            quickViewOpen && explorerDrawerEdgeRightClass
          )}
        >
          <CertificationDrawer
            open={quickViewOpen}
            selectedItem={selectedItem}
            onClose={() => setQuickViewOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}
