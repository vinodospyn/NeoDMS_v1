import { Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { RecentFileItem } from "@/features/drive/data/mock-dashboard"

type RecentFileCardProps = {
  item: RecentFileItem
}

export function RecentFileCard({ item }: RecentFileCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-2 border-b border-border/60 px-3 py-2.5">
        <FileTypeIcon
          name={item.name}
          explicitType={item.type}
          variant="compact"
          size="sm"
          className="mt-0.5"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
          <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
        </div>
        {item.tag ? (
          <Badge
            className={cn(
              "shrink-0 rounded px-1.5 py-0 text-[10px] font-semibold",
              item.tag.className
            )}
          >
            {item.tag.label}
          </Badge>
        ) : null}
      </div>
      <div
        className={cn(
          "mx-3 mt-3 flex h-[108px] items-center justify-center rounded-lg",
          item.previewClassName
        )}
      >
        <div className="h-[72px] w-[88px] rounded border border-white/80 bg-white/90 shadow-sm" />
      </div>
      <div className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-muted-foreground">
        <Clock3 className="size-3.5 shrink-0" aria-hidden />
        <span className="truncate">{item.openedAt}</span>
      </div>
    </article>
  )
}
