import { getFileKindLabel } from "@/features/drive/lib/file-types"
import type { FilterableColumn } from "@/features/drive/lib/table-column-filter"
import type { DriveItem } from "@/features/drive/types"

export const explorerTableFilterColumns: FilterableColumn<DriveItem>[] = [
  {
    id: "category",
    label: "Category",
    filterable: true,
    getFilterValue: (item) => item.category,
  },
  {
    id: "type",
    label: "Document Type",
    filterable: true,
    getFilterValue: (item) => getFileKindLabel(item.type),
  },
  {
    id: "createdAt",
    label: "Created Date",
    filterable: true,
    getFilterValue: (item) => item.createdAt,
  },
  {
    id: "fileSize",
    label: "File Size",
    filterable: true,
    getFilterValue: (item) => item.fileSize ?? "—",
  },
]
