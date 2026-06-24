"use client"

import { useRouter } from "next/navigation"
import { Download, ExternalLink, Share2, Star } from "lucide-react"

import {
  TableRowAction,
  TableRowActions,
} from "@/components/ui/table"
import { DriveItemActionsMenu } from "@/features/drive/components/drive-item-actions-menu"
import type { DriveItemActionHandlers } from "@/features/drive/lib/drive-item-actions"
import { buildPerspectiveViewHref } from "@/features/drive/lib/perspective-view-entry"
import type { DriveItem } from "@/features/drive/types"
import { cn } from "@/lib/utils"

type DriveTableRowActionsProps = {
  item: DriveItem
  handlers: DriveItemActionHandlers
}

function stopRowActivation(event: React.SyntheticEvent) {
  event.stopPropagation()
}

export function DriveTableRowActions({
  item,
  handlers,
}: DriveTableRowActionsProps) {
  const router = useRouter()
  const isStarred = Boolean(item.starred)

  function handleStar(event: React.MouseEvent<HTMLButtonElement>) {
    stopRowActivation(event)
    handlers.star?.(item)
  }

  function handleShare(event: React.MouseEvent<HTMLButtonElement>) {
    stopRowActivation(event)
    handlers.share?.(item)
  }

  function handleDownload(event: React.MouseEvent<HTMLButtonElement>) {
    stopRowActivation(event)
    if (handlers.download) {
      handlers.download(item)
      return
    }

    handlers.open?.(item)
  }

  function handleView(event: React.MouseEvent<HTMLButtonElement>) {
    stopRowActivation(event)
    if (handlers["open-perspective"]) {
      handlers["open-perspective"](item)
      return
    }

    if (handlers.preview) {
      handlers.preview(item)
      return
    }

    if (handlers.open) {
      handlers.open(item)
      return
    }

    router.push(buildPerspectiveViewHref(item))
  }

  return (
    <TableRowActions
      className={cn(
        "shrink-0 transition-[min-width] duration-150",
        isStarred ? "min-w-[4.5rem] group-hover:min-w-[9.5rem]" : "min-w-[9.5rem]"
      )}
      onClick={stopRowActivation}
      onPointerDown={stopRowActivation}
    >
      <TableRowAction
        type="button"
        visibility={isStarred ? "always" : "hover"}
        className="size-8 shrink-0"
        aria-label={isStarred ? "Remove from favorites" : "Add to favorites"}
        onClick={handleStar}
      >
        <Star
          className={cn(
            "size-4",
            isStarred ? "fill-amber-400 text-amber-400" : "opacity-70"
          )}
        />
      </TableRowAction>
      <TableRowAction
        type="button"
        visibility={isStarred ? "collapsedHover" : "hover"}
        className="size-8 shrink-0"
        aria-label="Share"
        onClick={handleShare}
      >
        <Share2 className="size-4" />
      </TableRowAction>
      <TableRowAction
        type="button"
        visibility={isStarred ? "collapsedHover" : "hover"}
        className="size-8 shrink-0"
        aria-label="Download"
        onClick={handleDownload}
      >
        <Download className="size-4" />
      </TableRowAction>
      <TableRowAction
        type="button"
        visibility={isStarred ? "collapsedHover" : "hover"}
        className="size-8 shrink-0"
        aria-label="Open in perspective view"
        onClick={handleView}
      >
        <ExternalLink className="size-4" />
      </TableRowAction>
      <DriveItemActionsMenu item={item} handlers={handlers} />
    </TableRowActions>
  )
}
