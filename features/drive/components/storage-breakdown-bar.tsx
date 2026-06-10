import type { StorageCategory } from "@/features/drive/data/mock-document-storage"
import { getStorageCategoryPercent } from "@/features/drive/lib/document-storage"
import { cn } from "@/lib/utils"

type StorageBreakdownBarProps = {
  categories: StorageCategory[]
  totalSizeGb: number
  className?: string
}

export function StorageBreakdownBar({
  categories,
  totalSizeGb,
  className,
}: StorageBreakdownBarProps) {
  const visibleCategories = categories.filter((category) => category.sizeGb > 0)

  return (
    <div
      className={cn(
        "flex h-2.5 w-full overflow-hidden rounded-full bg-muted/50",
        className
      )}
      role="img"
      aria-label="Storage breakdown by file type"
    >
      {visibleCategories.map((category) => (
        <div
          key={category.id}
          className={cn("h-full", category.barClassName)}
          style={{
            width: `${getStorageCategoryPercent(category.sizeGb, totalSizeGb)}%`,
          }}
        />
      ))}
    </div>
  )
}
