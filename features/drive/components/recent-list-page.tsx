"use client"

import { DriveListPage } from "@/features/drive/components/drive-list-page"
import { mockRecentItems } from "@/features/drive/data/mock-drive-lists"
import { recentColumns } from "@/features/drive/lib/drive-list-columns"

export function RecentListPage() {
  return (
    <DriveListPage
      items={mockRecentItems}
      columns={recentColumns}
      defaultSortColumnId="activityDateTime"
      searchPlaceholder="Search recent activity"
      minTableWidth="1200px"
    />
  )
}
