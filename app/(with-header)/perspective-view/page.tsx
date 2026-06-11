"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { DocumentViewerHeader } from "@/components/layout/document-viewer-header"
import { mockDriveItems } from "@/features/drive/data/mock-files"
import { getDocumentViewerHeaderActions } from "@/features/drive/lib/document-viewer-header-actions"

function formatCreatedSubtitle(createdAt: string) {
  return `Created on : ${createdAt}`
}

function PerspectiveViewFallback() {
  return (
    <>
      <DocumentViewerHeader
        title="Certificates"
        subtitle="Created on : 11-02-2026"
        kind="folder"
        name="Certificates"
        shared={false}
        actions={getDocumentViewerHeaderActions("folder")}
        backHref="/owned-by-me"
      />

      <div className="flex min-h-0 flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Perspective view — main layout will be added next.
      </div>
    </>
  )
}

function PerspectiveViewContent() {
  const searchParams = useSearchParams()
  const itemId = searchParams.get("id")
  const driveItem = React.useMemo(
    () => mockDriveItems.find((item) => item.id === itemId) ?? null,
    [itemId]
  )

  const title = driveItem?.name ?? "Certificates"
  const subtitle = driveItem
    ? formatCreatedSubtitle(driveItem.createdAt)
    : "Created on : 11-02-2026"
  const kind = driveItem?.type ?? "folder"
  const shared = driveItem?.type === "shared-folder"

  return (
    <>
      <DocumentViewerHeader
        title={title}
        subtitle={subtitle}
        kind={kind}
        name={title}
        shared={shared}
        actions={getDocumentViewerHeaderActions(kind)}
        backHref="/owned-by-me"
      />

      <div className="flex min-h-0 flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Perspective view — main layout will be added next.
      </div>
    </>
  )
}

export default function PerspectiveViewPage() {
  return (
    <React.Suspense fallback={<PerspectiveViewFallback />}>
      <PerspectiveViewContent />
    </React.Suspense>
  )
}
