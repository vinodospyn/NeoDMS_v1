import type { DriveFileKind } from "@/features/drive/lib/file-types"
import type { DriveItem } from "@/features/drive/types"

export type DriveItemActionId =
  | "open"
  | "open-perspective"
  | "preview"
  | "download"
  | "extract"
  | "print"
  | "rename"
  | "new-folder"
  | "share"
  | "manage-sharing"
  | "copy"
  | "move"
  | "star"
  | "file-info"
  | "move-to-trash"

export type DriveItemActionGroup =
  | "primary"
  | "organize"
  | "meta"
  | "destructive"

export type DriveItemAction = {
  id: DriveItemActionId
  label: string
  group: DriveItemActionGroup
  variant?: "destructive"
}

function folderActions(shared: boolean): DriveItemAction[] {
  return [
    { id: "open", label: "Open", group: "primary" },
    { id: "rename", label: "Rename", group: "organize" },
    { id: "new-folder", label: "New folder", group: "organize" },
    ...(shared
      ? [{ id: "manage-sharing" as const, label: "Manage sharing", group: "organize" as const }]
      : [{ id: "share" as const, label: "Share", group: "organize" as const }]),
    { id: "copy", label: "Copy", group: "organize" },
    { id: "move", label: "Move", group: "organize" },
    { id: "star", label: "Add to favorites", group: "meta" },
    { id: "file-info", label: "File info", group: "meta" },
    {
      id: "move-to-trash",
      label: "Move to trash",
      group: "destructive",
      variant: "destructive",
    },
  ]
}

function documentActions(includePrint: boolean): DriveItemAction[] {
  return [
    { id: "open-perspective", label: "Open in perspective view", group: "primary" },
    { id: "download", label: "Download", group: "primary" },
    ...(includePrint
      ? [{ id: "print" as const, label: "Print", group: "primary" as const }]
      : []),
    { id: "rename", label: "Rename", group: "organize" },
    { id: "share", label: "Share", group: "organize" },
    { id: "copy", label: "Copy", group: "organize" },
    { id: "star", label: "Add to favorites", group: "meta" },
    { id: "file-info", label: "File info", group: "meta" },
    {
      id: "move-to-trash",
      label: "Move to trash",
      group: "destructive",
      variant: "destructive",
    },
  ]
}

function getActionsForKind(kind: DriveFileKind): DriveItemAction[] {
  switch (kind) {
    case "folder":
      return folderActions(false)
    case "shared-folder":
      return folderActions(true)
    case "pdf":
      return [
        { id: "preview", label: "Preview", group: "primary" },
        ...documentActions(true),
      ]
    case "word":
    case "excel":
    case "ppt":
    case "txt":
      return documentActions(false)
    case "image":
      return [
        { id: "preview", label: "Preview", group: "primary" },
        { id: "open-perspective", label: "Open in perspective view", group: "primary" },
        { id: "download", label: "Download", group: "primary" },
        { id: "rename", label: "Rename", group: "organize" },
        { id: "share", label: "Share", group: "organize" },
        { id: "copy", label: "Copy link", group: "organize" },
        { id: "star", label: "Add to favorites", group: "meta" },
        { id: "file-info", label: "File info", group: "meta" },
        {
          id: "move-to-trash",
          label: "Move to trash",
          group: "destructive",
          variant: "destructive",
        },
      ]
    case "zip":
      return [
        { id: "download", label: "Download", group: "primary" },
        { id: "extract", label: "Extract", group: "primary" },
        { id: "rename", label: "Rename", group: "organize" },
        { id: "share", label: "Share", group: "organize" },
        { id: "star", label: "Add to favorites", group: "meta" },
        { id: "file-info", label: "File info", group: "meta" },
        {
          id: "move-to-trash",
          label: "Move to trash",
          group: "destructive",
          variant: "destructive",
        },
      ]
    default:
      return [
        { id: "download", label: "Download", group: "primary" },
        { id: "rename", label: "Rename", group: "organize" },
        { id: "share", label: "Share", group: "organize" },
        { id: "star", label: "Add to favorites", group: "meta" },
        { id: "file-info", label: "File info", group: "meta" },
        {
          id: "move-to-trash",
          label: "Move to trash",
          group: "destructive",
          variant: "destructive",
        },
      ]
  }
}

export function getDriveItemActions(item: DriveItem): DriveItemAction[] {
  return getActionsForKind(item.type).map((action) =>
    action.id === "star"
      ? {
          ...action,
          label: item.starred ? "Remove from favorites" : "Add to favorites",
        }
      : action
  )
}

const GRID_QUICK_ACTION_IDS: DriveItemActionId[] = [
  "star",
  "share",
  "download",
  "open-perspective",
]

/** Grid card ⋮ menu: four quick actions first, then the full per-type action list. */
export function getGridCardMenuActions(item: DriveItem): DriveItemAction[] {
  const itemActions = getDriveItemActions(item)

  const quickActions: DriveItemAction[] = GRID_QUICK_ACTION_IDS.map((id) => {
    const existing = itemActions.find((action) => action.id === id)
    if (existing) return existing

    const fallbackLabels: Partial<Record<DriveItemActionId, string>> = {
      "open-perspective": "Open in perspective view",
      share: "Share",
      download: "Download",
      star: item.starred ? "Remove from favorites" : "Add to favorites",
    }

    return {
      id,
      label: fallbackLabels[id] ?? id,
      group: "primary",
    }
  })

  const remaining = itemActions.filter(
    (action) => !GRID_QUICK_ACTION_IDS.includes(action.id)
  )

  return [...quickActions, ...remaining]
}

export type DriveItemActionHandlers = Partial<
  Record<DriveItemActionId, (item: DriveItem) => void>
>
