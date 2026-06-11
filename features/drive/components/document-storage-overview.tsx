"use client"

import * as React from "react"
import { ClipboardList, FileText, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DriveInfoCard } from "@/features/drive/components/drive-info-card"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import type {
  DocumentFileStorageInfo,
  StorageCategory,
} from "@/features/drive/data/mock-document-storage"
import { StorageBreakdownBar } from "@/features/drive/components/storage-breakdown-bar"
import { isPerspectiveDocument } from "@/features/drive/lib/document-comments"
import {
  getDocumentFileStorage,
  getDocumentStorage,
} from "@/features/drive/lib/document-storage"
import { cn } from "@/lib/utils"

type DocumentStorageOverviewProps = {
  selectedNode: PerspectiveTreeNode | null
  className?: string
}

function formatStorageSize(sizeGb: number) {
  return `${sizeGb.toFixed(1)} GB`
}

function formatFileSizeMb(sizeMb: number) {
  return Number.isInteger(sizeMb) ? String(sizeMb) : sizeMb.toFixed(1)
}

function StorageCategoryRow({ category }: { category: StorageCategory }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={cn("size-2 shrink-0 rounded-full", category.dotClassName)}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-foreground">{category.label}</p>
        <p className="text-xs text-muted-foreground">
          {category.itemCount.toLocaleString()} items
        </p>
      </div>
      <p className="shrink-0 text-xs font-semibold text-foreground">
        {formatStorageSize(category.sizeGb)}
      </p>
    </li>
  )
}

function StorageStatBlock({
  icon,
  iconClassName,
  iconBgClassName,
  value,
  label,
}: {
  icon: React.ReactNode
  iconClassName: string
  iconBgClassName: string
  value: string
  label: string
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          iconBgClassName
        )}
      >
        <span className={iconClassName}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-none text-foreground">
          {value}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function DocumentFileSizeInfo({
  fileStorage,
  className,
}: {
  fileStorage: DocumentFileStorageInfo
  className?: string
}) {
  const formattedPages =
    fileStorage.pageCount != null
      ? String(fileStorage.pageCount).padStart(2, "0")
      : null

  return (
    <DriveInfoCard className={className}>
      <p className="text-xs font-semibold text-foreground">Size Info</p>

      <div className="mt-3 border-t border-border/60 pt-3">
        <div className="flex items-stretch gap-3">
          <StorageStatBlock
            icon={<FileText className="size-3.5" strokeWidth={2} />}
            iconBgClassName="bg-violet-50 dark:bg-violet-500/10"
            iconClassName="text-violet-500"
            value={formatFileSizeMb(fileStorage.sizeMb)}
            label="MB"
          />

          {formattedPages != null ? (
            <>
              <div className="w-px shrink-0 bg-border/80" aria-hidden />
              <StorageStatBlock
                icon={<ClipboardList className="size-3.5" strokeWidth={2} />}
                iconBgClassName="bg-sky-50 dark:bg-sky-500/10"
                iconClassName="text-sky-500"
                value={formattedPages}
                label="Pages"
              />
            </>
          ) : null}
        </div>
      </div>
    </DriveInfoCard>
  )
}

export function DocumentStorageOverview({
  selectedNode,
  className,
}: DocumentStorageOverviewProps) {
  const [isCalculating, setIsCalculating] = React.useState(false)
  const isFile = isPerspectiveDocument(selectedNode)
  const fileStorage = isFile ? getDocumentFileStorage(selectedNode) : null
  const folderStorage = !isFile ? getDocumentStorage(selectedNode) : null

  const handleCalculateStorage = React.useCallback(() => {
    setIsCalculating(true)
    window.setTimeout(() => setIsCalculating(false), 900)
  }, [])

  if (!selectedNode) {
    return (
      <p className={cn("py-8 text-center text-xs text-muted-foreground", className)}>
        Select a folder or document to view storage details.
      </p>
    )
  }

  if (isFile && fileStorage) {
    return <DocumentFileSizeInfo fileStorage={fileStorage} className={className} />
  }

  if (!folderStorage) {
    return (
      <p className={cn("py-8 text-center text-xs text-muted-foreground", className)}>
        Storage details are not available for this item.
      </p>
    )
  }

  return (
    <DriveInfoCard className={className}>
      <p className="text-xs font-semibold text-foreground">Storage Overview</p>

      <div className="mt-3 space-y-4 border-t border-border/60 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-lg font-bold leading-none text-slate-800 dark:text-foreground">
              {formatStorageSize(folderStorage.totalSizeGb)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {folderStorage.totalFiles.toLocaleString()} Total Files
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 shrink-0 rounded-full px-2.5 text-xs font-medium"
            onClick={handleCalculateStorage}
            disabled={isCalculating}
          >
            <RefreshCw
              className={cn("size-3", isCalculating && "animate-spin")}
            />
            Calculate Storage
          </Button>
        </div>

        <StorageBreakdownBar
          categories={folderStorage.categories}
          totalSizeGb={folderStorage.totalSizeGb}
        />

        <ul className="space-y-4">
          {folderStorage.categories.map((category) => (
            <StorageCategoryRow key={category.id} category={category} />
          ))}
        </ul>
      </div>
    </DriveInfoCard>
  )
}
