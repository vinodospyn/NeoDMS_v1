"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CertificationDrawer } from "@/features/drive/components/certification-drawer"
import { FileExplorerBreadcrumb } from "@/features/drive/components/file-explorer-breadcrumb"
import { FileExplorerTable } from "@/features/drive/components/file-explorer-table"
import { FileExplorerToolbar } from "@/features/drive/components/file-explorer-toolbar"
import { MyFoldersDrawer } from "@/features/drive/components/my-folders-drawer"
import { mockDriveItems } from "@/features/drive/data/mock-files"
import { mockFolderTree } from "@/features/drive/data/mock-folder-tree"
import type { FileExplorerContext } from "@/features/drive/types/explorer-context"
import { useCollapseAppSidebarForFoldersDrawer } from "@/features/drive/hooks/use-collapse-app-sidebar-for-explorer"
import { explorerTableFilterColumns } from "@/features/drive/lib/explorer-table-columns"
import {
  buildColumnFilterSections,
  createEmptyColumnFilters,
  getFilterableColumnIds,
  type ColumnFilterState,
} from "@/features/drive/lib/table-column-filter"
import {
  EXPLORER_DRAWER_EASE,
  EXPLORER_DRAWER_TRANSITION_MS,
  explorerDrawerEdgeLeftClass,
  explorerDrawerEdgeRightClass,
  findFolderLabel,
  getExplorerGridTemplateColumns,
} from "@/features/drive/lib/explorer-layout"
import { driveExplorerChromeSectionClass } from "@/features/drive/lib/drive-grid-layout"
import type { DriveViewMode } from "@/features/drive/types/view-mode"

export function FileExplorerPage({
  context,
}: {
  context?: FileExplorerContext
} = {}) {
  const driveItems = context?.items ?? mockDriveItems
  const rootLabel = context?.rootLabel ?? "Personal Space"
  const rootHref = context?.rootHref ?? "#"
  const pathCrumbs = context?.pathCrumbs ?? undefined
  const defaultFolderLabel =
    context?.defaultFolderLabel ?? "u1210 - Arunkumar"

  const [folderSearch, setFolderSearch] = React.useState("")
  const filterableColumnIds = React.useMemo(
    () => getFilterableColumnIds(explorerTableFilterColumns),
    []
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilterState>(
    () => createEmptyColumnFilters(filterableColumnIds)
  )
  const filterSections = React.useMemo(
    () => buildColumnFilterSections(driveItems, explorerTableFilterColumns),
    [driveItems]
  )
  const [selectedFolderId, setSelectedFolderId] = React.useState("u1210")
  const [selectedItemId, setSelectedItemId] = React.useState("2")
  const [myFoldersDrawerOpen, setMyFoldersDrawerOpen] = React.useState(false)
  const [certificationDrawerOpen, setCertificationDrawerOpen] =
    React.useState(false)
  const [viewMode, setViewMode] = React.useState<DriveViewMode>("list")

  useCollapseAppSidebarForFoldersDrawer(myFoldersDrawerOpen)

  const selectedItem = React.useMemo(
    () => driveItems.find((item) => item.id === selectedItemId) ?? null,
    [driveItems, selectedItemId]
  )

  const activeFolderLabel = React.useMemo(
    () => findFolderLabel(mockFolderTree, selectedFolderId) ?? defaultFolderLabel,
    [defaultFolderLabel, selectedFolderId]
  )

  const toggleMyFoldersDrawer = React.useCallback(() => {
    setMyFoldersDrawerOpen((open) => !open)
  }, [])

  const closeMyFoldersDrawer = React.useCallback(() => {
    setMyFoldersDrawerOpen(false)
  }, [])

  const toggleCertificationDrawer = React.useCallback(() => {
    setCertificationDrawerOpen((open) => !open)
  }, [])

  const closeCertificationDrawer = React.useCallback(() => {
    setCertificationDrawerOpen(false)
  }, [])

  const openCertificationDrawer = React.useCallback(() => {
    setCertificationDrawerOpen(true)
  }, [])

  const gridTemplateColumns = getExplorerGridTemplateColumns(
    myFoldersDrawerOpen,
    certificationDrawerOpen
  )

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div
        className="grid h-full min-h-0 w-full overflow-hidden"
        style={{
          gridTemplateColumns,
          transition: `grid-template-columns ${EXPLORER_DRAWER_TRANSITION_MS}ms ${EXPLORER_DRAWER_EASE}`,
        }}
      >
        <div
          className={cn(
            "min-h-0 min-w-0 overflow-hidden bg-background",
            myFoldersDrawerOpen && explorerDrawerEdgeLeftClass
          )}
        >
          <MyFoldersDrawer
            open={myFoldersDrawerOpen}
            tree={mockFolderTree}
            selectedId={selectedFolderId}
            onSelectedIdChange={setSelectedFolderId}
            onClose={closeMyFoldersDrawer}
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          <div className={driveExplorerChromeSectionClass}>
            <FileExplorerBreadcrumb
              rootLabel={rootLabel}
              rootHref={rootHref}
              {...(pathCrumbs ? { pathCrumbs } : {})}
              activeFolderLabel={activeFolderLabel}
              onFileInfo={openCertificationDrawer}
            />
            <FileExplorerToolbar
              folderSearch={folderSearch}
              onFolderSearchChange={setFolderSearch}
              filterSections={filterSections}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              myFoldersOpen={myFoldersDrawerOpen}
              onToggleMyFolders={toggleMyFoldersDrawer}
              certificationOpen={certificationDrawerOpen}
              onToggleCertification={toggleCertificationDrawer}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <FileExplorerTable
              items={driveItems}
              folderSearch={folderSearch}
              columnFilters={columnFilters}
              embedded
              selectedId={selectedItemId}
              onSelectedIdChange={setSelectedItemId}
              onItemFileInfo={openCertificationDrawer}
              viewMode={viewMode}
            />
          </div>
        </div>

        <div
          className={cn(
            "min-h-0 min-w-0 overflow-hidden bg-background",
            certificationDrawerOpen && explorerDrawerEdgeRightClass
          )}
        >
          <CertificationDrawer
            open={certificationDrawerOpen}
            selectedItem={selectedItem}
            onClose={closeCertificationDrawer}
          />
        </div>
      </div>
    </div>
  )
}
