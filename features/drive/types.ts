import type { DriveFileKind } from "@/features/drive/lib/file-types"

export type { DriveFileKind } from "@/features/drive/lib/file-types"

/** @deprecated Prefer `DriveFileKind` — kept for existing drive item mocks. */
export type DriveItemType = DriveFileKind

export type DriveItem = {
  id: string
  name: string
  type: DriveItemType
  category: string
  workspace: string
  createdAt: string
  fileSize: string | null
  starred?: boolean
}

export type DriveSortKey = "name" | "createdAt"
export type DriveSortDirection = "asc" | "desc"
