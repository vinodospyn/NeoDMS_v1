"use client"

import * as React from "react"
import Image from "next/image"
import { Maximize2, Minus, Plus, RotateCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import { explorerChromeBarClass } from "@/features/drive/lib/explorer-layout"
import { isFolderKind, isPreviewableFile } from "@/features/drive/lib/perspective-tree"

type PerspectiveDocumentViewerProps = {
  selectedNode: PerspectiveTreeNode | null
}

const ZOOM_STEPS = [50, 75, 100, 125, 150, 200] as const

function FolderPreviewUnavailable() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-6 py-12 text-center">
      <Image
        src="/assets/perspective/folder-preview-empty.svg"
        alt=""
        width={220}
        height={182}
        className="h-auto w-[min(100%,220px)] max-w-full"
        aria-hidden
      />
      <div className="max-w-sm space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Folder Preview not Available
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Folder previews are not supported yet. Open the folder to view its
          files and contents.
        </p>
      </div>
    </div>
  )
}

function FilePreviewCanvas({
  node,
  zoom,
  rotation,
}: {
  node: PerspectiveTreeNode
  zoom: number
  rotation: number
}) {
  const isImage = node.kind === "image"
  const isVideo =
    node.label.toLowerCase().endsWith(".mp4") ||
    node.label.toLowerCase().endsWith(".webm")

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-muted/20 p-6">
      <div
        className="origin-center transition-transform duration-200"
        style={{
          transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
        }}
      >
        {isImage ? (
          <div
            className="flex h-[420px] w-[320px] items-center justify-center rounded-lg border border-border/60 bg-gradient-to-br from-sky-100 to-indigo-100 shadow-sm"
            role="img"
            aria-label={`Preview of ${node.label}`}
          >
            <FileTypeIcon kind="image" variant="brand" size="lg" />
          </div>
        ) : isVideo ? (
          <div className="flex h-[360px] w-[640px] items-center justify-center rounded-lg border border-border/60 bg-slate-900 text-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-white/10">
                <span className="ml-1 text-2xl">▶</span>
              </div>
              <p className="text-sm text-white/80">{node.label}</p>
            </div>
          </div>
        ) : (
          <div
            className="w-[min(100%,520px)] rounded-lg border border-border/60 bg-white p-8 shadow-sm"
            role="document"
            aria-label={`Preview of ${node.label}`}
          >
            <div className="mb-6 flex items-center gap-3 border-b border-border/50 pb-4">
              <FileTypeIcon kind={node.kind} name={node.label} variant="compact" size="md" />
              <p className="text-sm font-semibold text-foreground">{node.label}</p>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 rounded-full bg-muted",
                    index % 3 === 0 ? "w-full" : index % 3 === 1 ? "w-5/6" : "w-4/6"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function PerspectiveDocumentViewer({
  selectedNode,
}: PerspectiveDocumentViewerProps) {
  const viewerRef = React.useRef<HTMLDivElement>(null)
  const [zoomIndex, setZoomIndex] = React.useState(2)
  const [rotation, setRotation] = React.useState(0)

  const zoom = ZOOM_STEPS[zoomIndex]
  const title = selectedNode?.label ?? "Certificates"
  const showFilePreview =
    selectedNode != null && isPreviewableFile(selectedNode.kind)
  const showFolderEmpty =
    selectedNode == null || isFolderKind(selectedNode.kind)

  const zoomIn = () =>
    setZoomIndex((current) => Math.min(current + 1, ZOOM_STEPS.length - 1))
  const zoomOut = () => setZoomIndex((current) => Math.max(current - 1, 0))
  const rotate = () => setRotation((current) => (current + 90) % 360)

  const toggleFullscreen = React.useCallback(async () => {
    const element = viewerRef.current
    if (!element) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }
    await element.requestFullscreen()
  }, [])

  return (
    <section
      ref={viewerRef}
      className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-background"
    >
      <div className={cn(explorerChromeBarClass, "border-b border-border/60")}>
        <FileTypeIcon
          kind={selectedNode?.kind ?? "folder"}
          name={selectedNode?.label}
          shared={selectedNode?.shared}
          variant="compact"
          size="sm"
        />
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
          {title}
        </p>

        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            aria-label="Search in document"
          >
            <Search className="size-4" />
          </Button>
          <span className="px-2 text-xs font-medium text-muted-foreground tabular-nums">
            {zoom}%
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            aria-label="Zoom out"
            disabled={zoomIndex === 0}
            onClick={zoomOut}
          >
            <Minus className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            aria-label="Zoom in"
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            onClick={zoomIn}
          >
            <Plus className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            aria-label="Rotate"
            onClick={rotate}
          >
            <RotateCw className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            aria-label="Full screen"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {showFilePreview && selectedNode ? (
          <FilePreviewCanvas
            node={selectedNode}
            zoom={zoom}
            rotation={rotation}
          />
        ) : showFolderEmpty ? (
          <FolderPreviewUnavailable />
        ) : null}
      </div>
    </section>
  )
}
