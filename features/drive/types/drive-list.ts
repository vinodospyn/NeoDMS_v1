import type { ReactNode } from "react"

import type { DriveItem } from "@/features/drive/types"

export type DriveListSortDirection = "asc" | "desc"

export type DriveListColumn<T extends DriveItem> = {
  id: string
  label: string
  className?: string
  sortable?: boolean
  getSortValue?: (item: T) => string
  render: (item: T) => ReactNode
}

export type SharedWithMeItem = DriveItem & {
  sharedBy: string
  sharedDate: string
  permission: string
  department: string
  lastModified: string
  version: string
}

export type SharedByMeItem = DriveItem & {
  sharedWith: string
  sharedDate: string
  permissionGranted: string
  expiryDate: string
  lastAccessed: string
  version: string
}

export type FavoriteItem = DriveItem & {
  location: string
  owner: string
  lastModified: string
  version: string
  addedToFavorites: string
}

export type RecentItem = DriveItem & {
  activityType: string
  activityDateTime: string
  owner: string
  location: string
  version: string
}

export type TrashItem = DriveItem & {
  originalLocation: string
  deletedBy: string
  deletedDate: string
  retentionStatus: string
  version: string
}
