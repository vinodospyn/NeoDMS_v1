"use client"

import { ExternalLink, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DriveDetailPropertiesSection } from "@/features/drive/components/drive-detail-properties-section"
import type { DrivePropertyItem } from "@/features/drive/components/drive-property-field"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import { SharedWithCard } from "@/features/drive/components/shared-with-card"
import {
  getFileKindLabel,
  resolveFileKind,
  type DriveFileKind,
} from "@/features/drive/lib/file-types"
import { formatPerspectiveSubtitle } from "@/features/drive/lib/perspective-tree"
import type { DriveItem } from "@/features/drive/types"

type FileQuickViewPanelProps = {
  selectedItem: DriveItem | null
  onClose?: () => void
}

function getQuickViewTypeLabel(kind: DriveFileKind) {
  if (kind === "shared-folder") return "Google Drive Folder"
  return getFileKindLabel(kind)
}

function buildPropertyItems(
  selectedItem: DriveItem | null
): DrivePropertyItem[] {
  const fileKind = resolveFileKind(
    selectedItem?.name,
    selectedItem?.type ?? "folder"
  )

  return [
    { label: "Type", value: getQuickViewTypeLabel(fileKind) },
    { label: "Owner", value: "Rahul R" },
    { label: "Modified", value: "Apr 4, 2023 by me" },
    { label: "Opened", value: "May 11, 2026 by me" },
    { label: "Created", value: selectedItem?.createdAt ?? "Aug 27, 2018" },
  ]
}

export function FileQuickViewPanel({
  selectedItem,
  onClose,
}: FileQuickViewPanelProps) {
  const title = selectedItem?.name ?? "Certificates"
  const isShared = selectedItem?.type === "shared-folder"
  const subtitle = formatPerspectiveSubtitle(
    selectedItem?.createdAt ?? "11-02-2026"
  )
  const propertyItems = buildPropertyItems(selectedItem)

  return (
    <aside className="flex h-full flex-col bg-background">
      <header className="shrink-0 border-b border-border/60 px-4 py-4">
        <div className="flex items-start gap-2">
          <FileTypeIcon
            name={selectedItem?.name}
            explicitType={selectedItem?.type}
            shared={isShared}
            variant="brand"
            size="md"
          />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="truncate text-base font-semibold text-foreground">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Open in new tab"
            >
              <ExternalLink className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close quick view"
              onClick={onClose}
            >
              <X className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-4">
          <SharedWithCard />
          <DriveDetailPropertiesSection items={propertyItems} />
        </div>
      </ScrollArea>
    </aside>
  )
}
