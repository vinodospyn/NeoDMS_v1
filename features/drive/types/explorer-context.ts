import type { DriveItem } from "@/features/drive/types"

export type ExplorerBreadcrumbCrumb = {
  label: string
  href?: string
}

export type FileExplorerContext = {
  rootLabel: string
  rootHref?: string
  pathCrumbs?: ExplorerBreadcrumbCrumb[]
  items: DriveItem[]
  defaultFolderLabel?: string
}
