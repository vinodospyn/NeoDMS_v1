"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { FileExplorerTable } from "@/features/drive/components/file-explorer-table"
import { FileExplorerToolbar } from "@/features/drive/components/file-explorer-toolbar"
import { FolderTreePanel } from "@/features/drive/components/folder-tree-panel"
import { FileQuickViewPanel } from "@/features/drive/components/file-quick-view-panel"
import { mockDriveItems } from "@/features/drive/data/mock-files"
import { mockFolderTree } from "@/features/drive/data/mock-folder-tree"

const EXPLORER_CRUMBS = [
  { label: "My Files", href: "#" },
  { label: "On-boarding", href: "#" },
  { label: "Employees", href: "#" },
  { label: "u1210 - Arunkumar" },
] as const

export function FileExplorerPage() {
  const [folderSearch, setFolderSearch] = React.useState("")
  const [selectedFolderId, setSelectedFolderId] = React.useState("u1210")
  const [selectedItemId, setSelectedItemId] = React.useState("2")

  // Folder selection will be wired to breadcrumbs/table in next iteration.
  void selectedFolderId

  const selectedItem = React.useMemo(
    () => mockDriveItems.find((item) => item.id === selectedItemId) ?? null,
    [selectedItemId]
  )

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div className="flex min-h-0 flex-1 overflow-hidden bg-background shadow-sm">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize={220} minSize={250} maxSize={350}>
            <FolderTreePanel
              tree={mockFolderTree}
              selectedId={selectedFolderId}
              onSelectedIdChange={setSelectedFolderId}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={56} minSize={40}>
            <div className="flex h-full min-w-0 flex-col">
              <div className="flex items-center gap-2 border-b border-border/70 bg-background px-4 py-2.5">
                <Breadcrumb>
                  <BreadcrumbList className="gap-1 text-sm">
                    {EXPLORER_CRUMBS.map((crumb, index) => {
                      const isLast = index === EXPLORER_CRUMBS.length - 1
                      return (
                        <React.Fragment key={crumb.label}>
                          {index > 0 ? <BreadcrumbSeparator /> : null}
                          <BreadcrumbItem>
                            {isLast ? (
                              <BreadcrumbPage className="inline-flex items-center gap-1 font-medium">
                                {crumb.label}
                                <ChevronDown className="size-3.5 text-muted-foreground" />
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink
                                href={"href" in crumb ? crumb.href : "#"}
                              >
                                {crumb.label}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </React.Fragment>
                      )
                    })}
                  </BreadcrumbList>
                </Breadcrumb>

                <div className="ml-2 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    u1210 - Arunkumar
                  </span>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col bg-background">
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
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={220} minSize={250} maxSize={350}>
            <FileQuickViewPanel selectedItem={selectedItem} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
