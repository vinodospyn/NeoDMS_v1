"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Copy,
  Download,
  ExternalLink,
  Eye,
  ArrowRightLeft,
  FolderOpen,
  FolderPlus,
  Info,
  MoreVertical,
  PackageOpen,
  Pencil,
  Printer,
  Share2,
  Star,
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getGridCardMenuActions,
  type DriveItemAction,
  type DriveItemActionHandlers,
  type DriveItemActionId,
} from "@/features/drive/lib/drive-item-actions"
import { buildPerspectiveViewHref } from "@/features/drive/lib/perspective-view-entry"
import type { DriveItem } from "@/features/drive/types"
import { cn } from "@/lib/utils"

const ACTION_ICONS: Record<
  DriveItemActionId,
  React.ComponentType<{ className?: string }>
> = {
  open: FolderOpen,
  "open-perspective": ExternalLink,
  preview: Eye,
  download: Download,
  extract: PackageOpen,
  print: Printer,
  rename: Pencil,
  "new-folder": FolderPlus,
  share: Share2,
  "manage-sharing": Users,
  copy: Copy,
  move: ArrowRightLeft,
  star: Star,
  "file-info": Info,
  "move-to-trash": Trash2,
}

const GRID_QUICK_ACTION_COUNT = 4

function shouldShowSeparator(
  current: DriveItemAction,
  previous: DriveItemAction | undefined
) {
  return previous != null && previous.group !== current.group
}

type DriveGridCardActionsProps = {
  item: DriveItem
  handlers: DriveItemActionHandlers
}

export function DriveGridCardActions({
  item,
  handlers,
}: DriveGridCardActionsProps) {
  const router = useRouter()
  const actions = React.useMemo(() => getGridCardMenuActions(item), [item])

  const handleSelect = (actionId: DriveItemActionId) => {
    const handler = handlers[actionId]
    if (handler) {
      handler(item)
      return
    }

    switch (actionId) {
      case "open-perspective":
      case "preview":
        router.push(buildPerspectiveViewHref(item))
        break
      case "download":
        handlers.open?.(item)
        break
      default:
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            "size-7 shrink-0 text-muted-foreground opacity-0 transition-opacity",
            "group-hover:opacity-100 focus-visible:opacity-100"
          )}
          aria-label={`Actions for ${item.name}`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[12.5rem] p-1.5"
        onClick={(event) => event.stopPropagation()}
      >
        {actions.map((action, index) => {
          const Icon = ACTION_ICONS[action.id]
          const previous = index > 0 ? actions[index - 1] : undefined
          const showQuickDivider =
            index === GRID_QUICK_ACTION_COUNT && actions.length > GRID_QUICK_ACTION_COUNT

          return (
            <React.Fragment key={action.id}>
              {showQuickDivider ? <DropdownMenuSeparator /> : null}
              {!showQuickDivider && shouldShowSeparator(action, previous) ? (
                <DropdownMenuSeparator />
              ) : null}
              <DropdownMenuItem
                variant={action.variant}
                className="gap-2.5 px-3 py-2"
                onSelect={() => handleSelect(action.id)}
              >
                <Icon
                  className={cn(
                    "size-4",
                    action.id === "star" && item.starred
                      ? "fill-amber-400 text-amber-400"
                      : action.variant !== "destructive" && "text-muted-foreground"
                  )}
                />
                {action.label}
              </DropdownMenuItem>
            </React.Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
