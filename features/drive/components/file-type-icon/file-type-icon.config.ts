import {
  File, 
  type LucideIcon,
} from "lucide-react"

import { IconFolderFilled, IconFileTypePdf, IconFileWord, IconFileExcel, IconPresentationAnalytics , IconFileText, IconPolaroid, IconFileTypeZip  } from '@tabler/icons-react';

import type { DriveFileKind } from "@/features/drive/lib/file-types"

export type FileTypeIconVariant = "brand" | "compact"

export type FileTypeIconConfig = {
  icon: LucideIcon
  className: string
}

export const ICON_BY_KIND: Record<DriveFileKind, FileTypeIconConfig> = {
  folder: { icon: IconFolderFilled, className: "drive-folder-fill" },
  "shared-folder": { icon: IconFolderFilled, className: "drive-folder-fill" },
  pdf: { icon: IconFileTypePdf, className: "text-rose-500" },
  word: { icon: IconFileWord, className: "text-sky-600" },
  excel: { icon: IconFileExcel, className: "text-emerald-600" },
  ppt: { icon: IconPresentationAnalytics, className: "text-amber-500" },
  txt: { icon: IconFileText, className: "text-slate-500" },
  zip: { icon: IconFileTypeZip, className: "text-violet-500" },
  image: { icon: IconPolaroid, className: "text-orange-500" },
  unknown: { icon: File, className: "text-muted-foreground" },
}

/** Brand dashboard — larger icon slot (folders use filled Folder). */
export const BRAND_SIZE_CLASS = {
  sm: { box: "size-7", folder: "size-9", icon: "size-5", star: "size-2.5" },
  md: { box: "size-8", folder: "size-12", icon: "size-6", star: "size-3" },
  lg: { box: "size-10", folder: "size-14", icon: "size-7", star: "size-3.5" },
  xl: { box: "size-16", folder: "size-[4.5rem]", icon: "size-10", star: "size-4" },
} as const

export const COMPACT_SIZE_CLASS = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const
