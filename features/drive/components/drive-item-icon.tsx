import {
  FileArchive,
  FileImage,
  FileText,
  Folder,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { DriveItemType } from "@/features/drive/types"

const ICON_BY_TYPE: Record<
  DriveItemType,
  { icon: LucideIcon; className: string }
> = {
  folder: { icon: Folder, className: "text-amber-500" },
  pdf: { icon: FileText, className: "text-rose-500" },
  docx: { icon: FileText, className: "text-sky-600" },
  zip: { icon: FileArchive, className: "text-violet-500" },
  image: { icon: FileImage, className: "text-orange-500" },
}

type DriveItemIconProps = {
  type: DriveItemType
  className?: string
}

export function DriveItemIcon({ type, className }: DriveItemIconProps) {
  const { icon: Icon, className: tint } = ICON_BY_TYPE[type]
  return <Icon className={cn("size-5 shrink-0", tint, className)} aria-hidden />
}
