"use client"

import { DriveListPage } from "@/features/drive/components/drive-list-page"
import { mockSharedWithMeItems } from "@/features/drive/data/mock-drive-lists"
import { sharedWithMeColumns } from "@/features/drive/lib/drive-list-columns"

export function SharedWithMeListPage() {
  return (
    <DriveListPage
      items={mockSharedWithMeItems}
      columns={sharedWithMeColumns}
      searchPlaceholder="Search shared documents"
      minTableWidth="1280px"
    />
  )
}
