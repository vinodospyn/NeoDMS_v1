"use client"

import { DriveListPage } from "@/features/drive/components/drive-list-page"
import { mockFavoriteItems } from "@/features/drive/data/mock-drive-lists"
import { favoritesColumns } from "@/features/drive/lib/drive-list-columns"

export function FavoritesListPage() {
  return (
    <DriveListPage
      items={mockFavoriteItems}
      columns={favoritesColumns}
      searchPlaceholder="Search favorites"
      bulkVariant="favorites"
      minTableWidth="1280px"
    />
  )
}
