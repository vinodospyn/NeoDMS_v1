"use client"

import { DriveListPage } from "@/features/drive/components/drive-list-page"
import { mockSharedByMeItems } from "@/features/drive/data/mock-drive-lists"
import { sharedByMeColumns } from "@/features/drive/lib/drive-list-columns"

export function SharedByMeListPage() {
  return (
    <DriveListPage
      items={mockSharedByMeItems}
      columns={sharedByMeColumns}
      searchPlaceholder="Search documents you shared"
      minTableWidth="1280px"
    />
  )
}
