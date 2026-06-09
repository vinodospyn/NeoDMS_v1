"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { DocumentViewerHeader } from "@/components/layout/document-viewer-header"
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { mockPerspectiveTree } from "@/features/drive/data/mock-perspective-tree"
import { PerspectiveDocumentViewer } from "@/features/drive/components/perspective-view/perspective-document-viewer"
import { PerspectiveInfoPanel } from "@/features/drive/components/perspective-view/perspective-info-panel"
import { PerspectivePanelHandle } from "@/features/drive/components/perspective-view/perspective-panel-handle"
import { PerspectiveTreePanel } from "@/features/drive/components/perspective-view/perspective-tree-panel"
import { getDocumentViewerHeaderActions } from "@/features/drive/lib/document-viewer-header-actions"
import {
  findPerspectiveNode,
  formatPerspectiveSubtitle,
  getDefaultExpandedIds,
  getPerspectiveRootNode,
} from "@/features/drive/lib/perspective-tree"

function getInitialSelectedId(itemId: string | null) {
  if (itemId && findPerspectiveNode(mockPerspectiveTree, itemId)) {
    return itemId
  }
  return mockPerspectiveTree[0]?.id ?? ""
}

export function PerspectiveViewPage() {
  const searchParams = useSearchParams()
  const itemId = searchParams.get("id")
  const initialSelectedId = React.useMemo(
    () => getInitialSelectedId(itemId),
    [itemId]
  )

  const [selectedId, setSelectedId] = React.useState(initialSelectedId)
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() =>
    getDefaultExpandedIds(mockPerspectiveTree, initialSelectedId)
  )

  React.useEffect(() => {
    setSelectedId(initialSelectedId)
    setExpandedIds(getDefaultExpandedIds(mockPerspectiveTree, initialSelectedId))
  }, [initialSelectedId])

  const selectedNode = React.useMemo(
    () => findPerspectiveNode(mockPerspectiveTree, selectedId) ?? null,
    [selectedId]
  )

  const rootNode = React.useMemo(
    () => getPerspectiveRootNode(mockPerspectiveTree, initialSelectedId),
    [initialSelectedId]
  )

  const headerTitle = rootNode?.label ?? "Certificates"
  const headerSubtitle = formatPerspectiveSubtitle(
    rootNode?.createdAt ?? "11-02-2026"
  )
  const headerKind = rootNode?.kind ?? "folder"

  return (
    <>
      <DocumentViewerHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        kind={headerKind}
        name={headerTitle}
        shared={rootNode?.shared}
        actions={getDocumentViewerHeaderActions(headerKind)}
        backHref="/owned-by-me"
      />

      <div className="min-h-0 flex-1 bg-background">
        <ResizablePanelGroup
          id="perspective-view-layout"
          orientation="horizontal"
          className="h-full w-full"
          resizeTargetMinimumSize={{ coarse: 36, fine: 14 }}
        >
          <ResizablePanel
            id="perspective-tree"
            defaultSize="18%"
            minSize="14%"
            maxSize="32%"
            className="min-h-0 min-w-0 overflow-hidden"
          >
            <PerspectiveTreePanel
              tree={mockPerspectiveTree}
              selectedId={selectedId}
              onSelectedIdChange={setSelectedId}
              expandedIds={expandedIds}
              onExpandedIdsChange={setExpandedIds}
            />
          </ResizablePanel>

          <PerspectivePanelHandle />

          <ResizablePanel
            id="perspective-viewer"
            defaultSize="58%"
            minSize="36%"
            className="min-h-0 min-w-0 overflow-hidden"
          >
            <PerspectiveDocumentViewer selectedNode={selectedNode} />
          </ResizablePanel>

          <PerspectivePanelHandle />

          <ResizablePanel
            id="perspective-info"
            defaultSize="24%"
            minSize="18%"
            maxSize="36%"
            className="min-h-0 min-w-0 overflow-hidden"
          >
            <PerspectiveInfoPanel selectedNode={selectedNode} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
