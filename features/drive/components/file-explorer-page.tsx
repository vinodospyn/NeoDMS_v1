"use client"

import * as React from "react"
import { ChevronDown, Home, Info } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CertificationDrawer } from "@/features/drive/components/certification-drawer"
import { FileExplorerTable } from "@/features/drive/components/file-explorer-table"
import { FileExplorerToolbar } from "@/features/drive/components/file-explorer-toolbar"
import { FolderTreeToggleIcon } from "@/features/drive/components/folder-tree-toggle-icon"
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
  explorerFolderToggleClass,
  findFolderLabel,
  getExplorerGridTemplateColumns,
} from "@/features/drive/lib/explorer-layout"

const STATIC_CRUMBS = [
  { label: "My Files", href: "#" },
  { label: "On-boarding", href: "#" },
  { label: "Employees", href: "#" },
] as const

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
    () => findFolderLabel(mockFolderTree, selectedFolderId) ?? "u1210 - Arunkumar",
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

  const gridTemplateColumns = getExplorerGridTemplateColumns(
    myFoldersDrawerOpen,
    certificationDrawerOpen
  )

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div
        className="grid h-full min-h-0 w-full overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm"
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
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                explorerFolderToggleClass,
                myFoldersDrawerOpen && "ring-2 ring-primary/20"
              )}
              aria-label={
                myFoldersDrawerOpen ? "Close My Folders" : "Open My Folders"
              }
              aria-pressed={myFoldersDrawerOpen}
              aria-expanded={myFoldersDrawerOpen}
              onClick={toggleMyFoldersDrawer}
            >
              <FolderTreeToggleIcon />
            </Button>

            <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
              <BreadcrumbList className="flex-nowrap gap-1 overflow-hidden text-sm">
                <BreadcrumbItem className="shrink-0">
                  <BreadcrumbLink
                    href="#"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Home className="size-3.5" aria-hidden />
                    <span className="sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="shrink-0" />
                {STATIC_CRUMBS.map((crumb) => (
                  <React.Fragment key={crumb.label}>
                    <BreadcrumbItem className="hidden shrink-0 sm:block">
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden shrink-0 sm:block" />
                  </React.Fragment>
                ))}
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="inline-flex max-w-full items-center gap-1 truncate font-medium">
                    <span className="truncate">{activeFolderLabel}</span>
                    <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                "ml-1 size-8 shrink-0 rounded-full text-white transition-all duration-200 hover:text-white",
                certificationDrawerOpen
                  ? "bg-primary/85 shadow-sm hover:bg-primary/75"
                  : "primary-button hover:opacity-90"
              )}
              aria-label={
                certificationDrawerOpen
                  ? "Close certificates panel"
                  : "Open certificates panel"
              }
              aria-pressed={certificationDrawerOpen}
              aria-expanded={certificationDrawerOpen}
              onClick={toggleCertificationDrawer}
            >
              <Info className="size-4" aria-hidden />
            </Button>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <FileExplorerToolbar
              folderSearch={folderSearch}
              onFolderSearchChange={setFolderSearch}
            />
            <FileExplorerTable
              folderSearch={folderSearch}
              embedded
              selectedId={selectedItemId}
              onSelectedIdChange={setSelectedItemId}
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
