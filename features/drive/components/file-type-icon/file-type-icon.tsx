import { Share2 } from "lucide-react"
import { IconFolderFilled } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import {
  BRAND_SIZE_CLASS,
  COMPACT_SIZE_CLASS,
  ICON_BY_KIND,
  type FileTypeIconVariant,
} from "@/features/drive/components/file-type-icon/file-type-icon.config"
import {
  resolveFileKind,
  type DriveFileKind,
} from "@/features/drive/lib/file-types"

export type FileTypeIconSize = keyof typeof BRAND_SIZE_CLASS

export type FileTypeIconProps = {
  kind?: DriveFileKind
  name?: string | null
  explicitType?: string | null
  variant?: FileTypeIconVariant
  size?: FileTypeIconSize
  shared?: boolean
  className?: string
}

function resolveKind({
  kind,
  name,
  explicitType,
  shared,
}: Pick<
  FileTypeIconProps,
  "kind" | "name" | "explicitType" | "shared"
>): DriveFileKind {
  if (shared) return "shared-folder"
  if (kind) return kind
  return resolveFileKind(name, explicitType)
}

function BrandFolderIcon({
  shared,
  size,
}: {
  shared: boolean
  size: FileTypeIconSize
}) {
  const dims = BRAND_SIZE_CLASS[size]

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        dims.box
      )}
      aria-hidden
    >
      <IconFolderFilled
        className={cn("drive-folder-fill", dims.folder)}
        strokeWidth={0}
      />
      {shared ? (
        <Share2
          className={cn(
            "absolute top-[30%] left-1/2 -translate-x-1/2 fill-amber-400 text-amber-400",
            dims.star
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      ) : null}
    </div>
  )
}

function LucideFileTypeIcon({
  kind,
  variant,
  size,
  className,
}: {
  kind: DriveFileKind
  variant: FileTypeIconVariant
  size: FileTypeIconSize
  className?: string
}) {
  const { icon: Icon, className: tint } = ICON_BY_KIND[kind]
  const isSharedFolder = kind === "shared-folder"
  const iconSize =
    variant === "brand" ? BRAND_SIZE_CLASS[size].icon : COMPACT_SIZE_CLASS[size]

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        variant === "brand" ? BRAND_SIZE_CLASS[size].box : undefined,
        className
      )}
    >
      <Icon className={cn(iconSize, tint)} strokeWidth={1.75} aria-hidden />
      {isSharedFolder ? (
        <Share2
          className={cn(
            "absolute fill-amber-300 text-amber-300",
            variant === "brand"
              ? cn(BRAND_SIZE_CLASS[size].star, "top-[10%] right-[10%]")
              : "top-2 right-1.75 size-2.5"
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      ) : null}
    </span>
  )
}

export function FileTypeIcon({
  kind,
  name,
  explicitType,
  variant = "compact",
  size = "lg",
  shared = false,
  className,
}: FileTypeIconProps) {
  const resolvedKind = resolveKind({ kind, name, explicitType, shared })

  if (
    variant === "brand" &&
    (resolvedKind === "folder" || resolvedKind === "shared-folder")
  ) {
    return (
      <BrandFolderIcon shared={resolvedKind === "shared-folder"} size={size} />
    )
  }

  return (
    <LucideFileTypeIcon
      kind={resolvedKind}
      variant={variant}
      size={size}
      className={className}
    />
  )
}
