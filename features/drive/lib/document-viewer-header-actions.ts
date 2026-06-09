import type { DriveFileKind } from "@/features/drive/lib/file-types"

export type DocumentViewerHeaderActionId =
  | "comments"
  | "share"
  | "download"
  | "print"
  | "fullscreen"
  | "info"

export type DocumentViewerHeaderAction = {
  id: DocumentViewerHeaderActionId
  label: string
  badge?: number | string
  disabled?: boolean
}

/** Default header actions per file/folder kind — override via `actions` prop when needed. */
export function getDocumentViewerHeaderActions(
  kind: DriveFileKind
): DocumentViewerHeaderAction[] {
  switch (kind) {
    case "folder":
    case "shared-folder":
      return [{ id: "comments", label: "Comments", badge: 5 }]
    case "pdf":
      return [
        { id: "comments", label: "Comments", badge: 5 },
        { id: "download", label: "Download" },
        { id: "share", label: "Share" },
        { id: "print", label: "Print" },
      ]
    case "image":
      return [
        { id: "comments", label: "Comments" },
        { id: "download", label: "Download" },
        { id: "share", label: "Share" },
        { id: "fullscreen", label: "Full screen" },
      ]
    case "word":
    case "excel":
    case "ppt":
      return [
        { id: "comments", label: "Comments" },
        { id: "download", label: "Download" },
        { id: "share", label: "Share" },
      ]
    default:
      return [
        { id: "comments", label: "Comments" },
        { id: "download", label: "Download" },
        { id: "share", label: "Share" },
      ]
  }
}
