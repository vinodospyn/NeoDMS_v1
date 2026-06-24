"use client"

import { DriveListPage } from "@/features/drive/components/drive-list-page"
import { mockTrashItems } from "@/features/drive/data/mock-drive-lists"
import { trashColumns } from "@/features/drive/lib/drive-list-columns"

export function TrashListPage() {
  return (
    <DriveListPage
      items={mockTrashItems}
      columns={trashColumns}
      searchPlaceholder="Search trash"
      bulkVariant="trash"
      minTableWidth="1200px"
    />
  )
}
