"use client"

import * as React from "react"
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

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableRowAction } from "@/components/ui/table"
import {
  getDriveItemActions,
  type DriveItemAction,
  type DriveItemActionHandlers,
  type DriveItemActionId,
} from "@/features/drive/lib/drive-item-actions"
import type { DriveItem } from "@/features/drive/types"

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

type DriveItemActionsMenuProps = {
  item: DriveItem
  handlers?: DriveItemActionHandlers
}

function shouldShowSeparator(
  current: DriveItemAction,
  previous: DriveItemAction | undefined
) {
  return previous != null && previous.group !== current.group
}

export function DriveItemActionsMenu({
  item,
  handlers = {},
}: DriveItemActionsMenuProps) {
  const actions = React.useMemo(() => getDriveItemActions(item), [item])

  const handleSelect = (actionId: DriveItemActionId) => {
    handlers[actionId]?.(item)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TableRowAction
          type="button"
          visibility="always"
          aria-label={`More actions for ${item.name}`}
          onClick={(event) => event.stopPropagation()}
        >
          <MoreVertical className="size-4" />
        </TableRowAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[12.5rem] p-1.5"
        onClick={(event) => event.stopPropagation()}
      >
        {actions.map((action, index) => {
          const Icon = ACTION_ICONS[action.id]
          const previous = index > 0 ? actions[index - 1] : undefined
          return (
            <React.Fragment key={action.id}>
              {shouldShowSeparator(action, previous) ? (
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
                    action.variant !== "destructive" && "text-muted-foreground"
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
