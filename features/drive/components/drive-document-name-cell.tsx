import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { DriveItem } from "@/features/drive/types"
import { cn } from "@/lib/utils"

type DriveDocumentNameCellProps = {
  item: Pick<DriveItem, "name" | "type">
  className?: string
}

export function DriveDocumentNameCell({
  item,
  className,
}: DriveDocumentNameCellProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <FileTypeIcon
        name={item.name}
        explicitType={item.type}
        variant="compact"
        size="md"
      />
      <span className="truncate font-medium text-foreground">{item.name}</span>
    </div>
  )
}