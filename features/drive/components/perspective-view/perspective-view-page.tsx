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
import { ManageSharingDialog } from "@/features/drive/components/manage-sharing-dialog"
import { PerspectiveTreePanel } from "@/features/drive/components/perspective-view/perspective-tree-panel"
import { getDocumentViewerHeaderActions } from "@/features/drive/lib/document-viewer-header-actions"
import {
  findPerspectiveNode,
  formatPerspectiveSubtitle,
} from "@/features/drive/lib/perspective-tree"
import {
  resolvePerspectiveSession,
  type PerspectiveSession,
} from "@/features/drive/lib/perspective-view-entry"
import type { DriveFileKind } from "@/features/drive/lib/file-types"

function getInitialSession(
  itemId: string | null,
  kind: DriveFileKind | null,
  name: string | null
): PerspectiveSession {
  return resolvePerspectiveSession(mockPerspectiveTree, itemId, {
    kind: kind ?? undefined,
    name: name ?? undefined,
  })
}

export function PerspectiveViewPage() {
  const searchParams = useSearchParams()
  const itemId = searchParams.get("id")
  const kind = searchParams.get("kind") as DriveFileKind | null
  const name = searchParams.get("name")
  const initialSession = React.useMemo(
    () => getInitialSession(itemId, kind, name),
    [itemId, kind, name]
  )

  return (
    <PerspectiveViewPageContent
      key={`${itemId ?? ""}-${kind ?? ""}-${name ?? ""}`}
      initialSession={initialSession}
    />
  )
}

function PerspectiveViewPageContent({
  initialSession,
}: {
  initialSession: PerspectiveSession
}) {
  const [selectedId, setSelectedId] = React.useState(initialSession.selectedId)
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => initialSession.expandedIds
  )
  const [sharingOpen, setSharingOpen] = React.useState(false)

  const browseTree = initialSession.tree
  const showTree = initialSession.mode === "browse"

  const selectedNode = React.useMemo(() => {
    if (initialSession.mode === "single") {
      return initialSession.selectedNode
    }

    return (
      findPerspectiveNode(browseTree, selectedId) ??
      findPerspectiveNode(mockPerspectiveTree, selectedId) ??
      initialSession.contextNode
    )
  }, [browseTree, initialSession, selectedId])

  const headerTitle = initialSession.contextNode.label
  const headerSubtitle = formatPerspectiveSubtitle(
    initialSession.contextNode.createdAt ?? "11-02-2026"
  )
  const headerKind = initialSession.contextNode.kind

  const sharingTitle = selectedNode?.label ?? headerTitle
  const sharingSubtitle = formatPerspectiveSubtitle(
    selectedNode?.createdAt ?? initialSession.contextNode.createdAt ?? "11-02-2026"
  )
  const sharingKind = selectedNode?.kind ?? headerKind
  const sharingShared =
    selectedNode?.shared ?? selectedNode?.kind === "shared-folder"

  const handleHeaderAction = React.useCallback(
    (actionId: "comments" | "share" | "download" | "print" | "fullscreen" | "info") => {
      if (actionId === "share") {
        setSharingOpen(true)
      }
    },
    []
  )

  return (
    <>
      <DocumentViewerHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        kind={headerKind}
        name={headerTitle}
        shared={initialSession.contextNode.shared}
        actions={getDocumentViewerHeaderActions(headerKind)}
        backHref="/personal-space"
        onAction={handleHeaderAction}
      />

      <ManageSharingDialog
        open={sharingOpen}
        onOpenChange={setSharingOpen}
        title={sharingTitle}
        subtitle={sharingSubtitle}
        kind={sharingKind}
        name={sharingTitle}
        shared={sharingShared}
      />

      <div className="min-h-0 flex-1 bg-background">
        <ResizablePanelGroup
          id="perspective-view-layout"
          orientation="horizontal"
          className="h-full w-full"
          resizeTargetMinimumSize={{ coarse: 36, fine: 14 }}
        >
          {showTree ? (
            <>
              <ResizablePanel
                id="perspective-tree"
                defaultSize="18%"
                minSize="14%"
                maxSize="32%"
                className="min-h-0 min-w-0 overflow-hidden"
              >
                <PerspectiveTreePanel
                  tree={browseTree}
                  selectedId={selectedId}
                  onSelectedIdChange={setSelectedId}
                  expandedIds={expandedIds}
                  onExpandedIdsChange={setExpandedIds}
                />
              </ResizablePanel>

              <PerspectivePanelHandle />
            </>
          ) : null}

          <ResizablePanel
            id="perspective-viewer"
            defaultSize={showTree ? "58%" : "72%"}
            minSize="36%"
            className="min-h-0 min-w-0 overflow-hidden"
          >
            <PerspectiveDocumentViewer
              key={selectedNode?.id ?? "none"}
              selectedNode={selectedNode}
            />
          </ResizablePanel>

          <PerspectivePanelHandle />

          <ResizablePanel
            id="perspective-info"
            defaultSize={showTree ? "24%" : "28%"}
            minSize="18%"
            maxSize="36%"
            className="min-h-0 min-w-0 overflow-hidden"
          >
            <PerspectiveInfoPanel
              selectedNode={selectedNode}
              onManageSharing={() => setSharingOpen(true)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
