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
import { useCollapseAppSidebarForFoldersDrawer } from "@/features/drive/hooks/use-collapse-app-sidebar-for-explorer"
import {
  EXPLORER_DRAWER_EASE,
  EXPLORER_DRAWER_TRANSITION_MS,
  explorerChromeBarClass,
  explorerDrawerEdgeLeftClass,
  explorerDrawerEdgeRightClass,
  findFolderLabel,
  getExplorerGridTemplateColumns,
} from "@/features/drive/lib/explorer-layout"

export function FileExplorerPage() {
  const [folderSearch, setFolderSearch] = React.useState("")
  const [selectedFolderId, setSelectedFolderId] = React.useState("u1210")
  const [selectedItemId, setSelectedItemId] = React.useState("2")
  const [myFoldersDrawerOpen, setMyFoldersDrawerOpen] = React.useState(false)
  const [certificationDrawerOpen, setCertificationDrawerOpen] =
    React.useState(false)

  useCollapseAppSidebarForFoldersDrawer(myFoldersDrawerOpen)

  const selectedItem = React.useMemo(
    () => mockDriveItems.find((item) => item.id === selectedItemId) ?? null,
    [selectedItemId]
  )

  const activeFolderLabel = React.useMemo(
    () =>
      findFolderLabel(mockFolderTree, selectedFolderId) ?? "u1210 - Arunkumar",
    [selectedFolderId]
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
          <div className={explorerChromeBarClass}>
            <FileExplorerBreadcrumb
              activeFolderLabel={activeFolderLabel}
              onFileInfo={openCertificationDrawer}
            />
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <FileExplorerToolbar
              folderSearch={folderSearch}
              onFolderSearchChange={setFolderSearch}
              myFoldersOpen={myFoldersDrawerOpen}
              onToggleMyFolders={toggleMyFoldersDrawer}
              certificationOpen={certificationDrawerOpen}
              onToggleCertification={toggleCertificationDrawer}
            />
            <FileExplorerTable
              folderSearch={folderSearch}
              embedded
              selectedId={selectedItemId}
              onSelectedIdChange={setSelectedItemId}
              onItemFileInfo={openCertificationDrawer}
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
