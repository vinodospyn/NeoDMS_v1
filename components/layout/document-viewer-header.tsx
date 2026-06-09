"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Download,
  Info,
  Maximize2,
  MessageSquare,
  Printer,
  Share2,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { DocumentViewerHeaderAction } from "@/features/drive/lib/document-viewer-header-actions"
import { getDocumentViewerHeaderActions } from "@/features/drive/lib/document-viewer-header-actions"
import type { DriveFileKind } from "@/features/drive/lib/file-types"
import { cn } from "@/lib/utils"

const ACTION_ICONS: Record<
  DocumentViewerHeaderAction["id"],
  LucideIcon
> = {
  comments: MessageSquare,
  share: Share2,
  download: Download,
  print: Printer,
  fullscreen: Maximize2,
  info: Info,
}

export type DocumentViewerHeaderProps = {
  title: string
  subtitle?: string
  kind?: DriveFileKind
  name?: string
  explicitType?: string | null
  shared?: boolean
  actions?: DocumentViewerHeaderAction[]
  onBack?: () => void
  backHref?: string
  backLabel?: string
  onAction?: (actionId: DocumentViewerHeaderAction["id"]) => void
  className?: string
}

export function DocumentViewerHeader({
  title,
  subtitle,
  kind,
  name,
  explicitType,
  shared = false,
  actions,
  onBack,
  backHref,
  backLabel = "Go back",
  onAction,
  className,
}: DocumentViewerHeaderProps) {
  const router = useRouter()
  const resolvedKind = kind ?? "unknown"
  const resolvedActions =
    actions ?? getDocumentViewerHeaderActions(resolvedKind)

  const handleBack = React.useCallback(() => {
    if (onBack) {
      onBack()
      return
    }
    router.back()
  }, [onBack, router])

  const backControl = backHref ? (
    <Button
      variant="ghost"
      size="icon-sm"
      className="viewer-header-action shrink-0 border"
      aria-label={backLabel}
      asChild
    >
      <Link href={backHref}>
        <ArrowLeft className="size-4" />
      </Link>
    </Button>
  ) : (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="viewer-header-action shrink-0 border"
      aria-label={backLabel}
      onClick={handleBack}
    >
      <ArrowLeft className="size-4" />
    </Button>
  )

  return (
    <header
      className={cn(
        "document-viewer-header flex h-14 shrink-0 items-center gap-3 border-b px-4 sm:px-5",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {backControl}

        <FileTypeIcon
          kind={resolvedKind}
          name={name ?? title}
          explicitType={explicitType}
          shared={shared}
          variant="brand"
          size="sm"
          className="shrink-0"
        />

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold leading-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-xs leading-snug text-(--viewer-header-muted)">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {resolvedActions.length > 0 ? (
        <div className="flex shrink-0 items-center gap-2">
          {resolvedActions.map((action) => {
            const Icon = ACTION_ICONS[action.id]
            return (
              <Button
                key={action.id}
                type="button"
                variant="ghost"
                size="icon-sm"
                className="viewer-header-action relative shrink-0 border"
                aria-label={action.label}
                disabled={action.disabled}
                onClick={() => onAction?.(action.id)}
              >
                <Icon className="size-4" />
                {action.badge != null && action.badge !== "" ? (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                    {action.badge}
                  </span>
                ) : null}
              </Button>
            )
          })}
        </div>
      ) : null}
    </header>
  )
}
