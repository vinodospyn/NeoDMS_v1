import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { QuickAccessItem } from "@/features/drive/data/mock-dashboard"

type QuickAccessCardProps = {
  item: QuickAccessItem
}

export function QuickAccessCard({ item }: QuickAccessCardProps) {
  return (
    <button
      type="button"
      className="drive-quick-access-card group flex h-[60px] w-full min-w-0 items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left transition-colors hover:bg-[#e8ecf1] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <FileTypeIcon
        kind={item.kind}
        shared={item.shared}
        variant="brand"
        size="md"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm leading-tight font-semibold text-[#1f2937]">
          {item.name}
        </p>
        <p className="mt-0.5 truncate text-xs leading-snug text-[#6b7280]">
          {item.subtitle}
        </p>
      </div>
    </button>
  )
}
