import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import {
  ActivityTypeBadge,
  PermissionBadge,
  RetentionStatusBadge,
} from "@/features/drive/components/drive-list-status"
import { getFileKindLabel } from "@/features/drive/lib/file-types"
import type { DriveItem } from "@/features/drive/types"
import type {
  DriveListColumn,
  FavoriteItem,
  RecentItem,
  SharedByMeItem,
  SharedWithMeItem,
  TrashItem,
} from "@/features/drive/types/drive-list"

function renderDocumentName(item: DriveItem) {
  return (
    <div className="flex items-center gap-2.5">
      <FileTypeIcon
        name={item.name}
        explicitType={item.type}
        variant="compact"
        size="md"
      />
      <span className="font-medium text-foreground">{item.name}</span>
    </div>
  )
}

function renderDocumentType(item: DriveItem) {
  return (
    <span className="text-muted-foreground">
      {getFileKindLabel(item.type)}
    </span>
  )
}

function mutedText(value: string) {
  return <span className="text-muted-foreground">{value}</span>
}

export const sharedWithMeColumns: DriveListColumn<SharedWithMeItem>[] = [
  {
    id: "name",
    label: "Document Name",
    className: "min-w-[220px]",
    sortable: true,
    getSortValue: (item) => item.name,
    render: renderDocumentName,
  },
  {
    id: "type",
    label: "Document Type",
    className: "w-[12%]",
    sortable: true,
    getSortValue: (item) => getFileKindLabel(item.type),
    render: renderDocumentType,
  },
  {
    id: "sharedBy",
    label: "Shared By",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => item.sharedBy,
    render: (item) => mutedText(item.sharedBy),
  },
  {
    id: "sharedDate",
    label: "Shared Date",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.sharedDate,
    render: (item) => mutedText(item.sharedDate),
  },
  {
    id: "permission",
    label: "Permission",
    className: "w-[9%]",
    sortable: true,
    getSortValue: (item) => item.permission,
    render: (item) => <PermissionBadge permission={item.permission} />,
  },
  {
    id: "department",
    label: "Department / Category",
    className: "w-[13%]",
    sortable: true,
    getSortValue: (item) => item.department,
    render: (item) => mutedText(item.department),
  },
  {
    id: "lastModified",
    label: "Last Modified",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.lastModified,
    render: (item) => mutedText(item.lastModified),
  },
  {
    id: "version",
    label: "Version",
    className: "w-[7%]",
    sortable: true,
    getSortValue: (item) => item.version,
    render: (item) => mutedText(item.version),
  },
]

export const sharedByMeColumns: DriveListColumn<SharedByMeItem>[] = [
  {
    id: "name",
    label: "Document Name",
    className: "min-w-[220px]",
    sortable: true,
    getSortValue: (item) => item.name,
    render: renderDocumentName,
  },
  {
    id: "type",
    label: "Document Type",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => getFileKindLabel(item.type),
    render: renderDocumentType,
  },
  {
    id: "sharedWith",
    label: "Shared With",
    className: "w-[14%]",
    sortable: true,
    getSortValue: (item) => item.sharedWith,
    render: (item) => mutedText(item.sharedWith),
  },
  {
    id: "sharedDate",
    label: "Shared Date",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.sharedDate,
    render: (item) => mutedText(item.sharedDate),
  },
  {
    id: "permissionGranted",
    label: "Permission Granted",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => item.permissionGranted,
    render: (item) => (
      <PermissionBadge permission={item.permissionGranted} />
    ),
  },
  {
    id: "expiryDate",
    label: "Expiry Date",
    className: "w-[9%]",
    sortable: true,
    getSortValue: (item) => item.expiryDate,
    render: (item) => mutedText(item.expiryDate),
  },
  {
    id: "lastAccessed",
    label: "Last Accessed",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.lastAccessed,
    render: (item) => mutedText(item.lastAccessed),
  },
  {
    id: "version",
    label: "Version",
    className: "w-[7%]",
    sortable: true,
    getSortValue: (item) => item.version,
    render: (item) => mutedText(item.version),
  },
]

export const favoritesColumns: DriveListColumn<FavoriteItem>[] = [
  {
    id: "name",
    label: "Document Name",
    className: "min-w-[220px]",
    sortable: true,
    getSortValue: (item) => item.name,
    render: renderDocumentName,
  },
  {
    id: "type",
    label: "Document Type",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => getFileKindLabel(item.type),
    render: renderDocumentType,
  },
  {
    id: "location",
    label: "Location",
    className: "w-[14%]",
    sortable: true,
    getSortValue: (item) => item.location,
    render: (item) => mutedText(item.location),
  },
  {
    id: "owner",
    label: "Owner",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.owner,
    render: (item) => mutedText(item.owner),
  },
  {
    id: "category",
    label: "Category",
    className: "w-[9%]",
    sortable: true,
    getSortValue: (item) => item.category,
    render: (item) => mutedText(item.category),
  },
  {
    id: "lastModified",
    label: "Last Modified",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.lastModified,
    render: (item) => mutedText(item.lastModified),
  },
  {
    id: "version",
    label: "Version",
    className: "w-[7%]",
    sortable: true,
    getSortValue: (item) => item.version,
    render: (item) => mutedText(item.version),
  },
  {
    id: "addedToFavorites",
    label: "Added to Favorites",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => item.addedToFavorites,
    render: (item) => mutedText(item.addedToFavorites),
  },
]

export const recentColumns: DriveListColumn<RecentItem>[] = [
  {
    id: "name",
    label: "Document Name",
    className: "min-w-[220px]",
    sortable: true,
    getSortValue: (item) => item.name,
    render: renderDocumentName,
  },
  {
    id: "type",
    label: "Document Type",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => getFileKindLabel(item.type),
    render: renderDocumentType,
  },
  {
    id: "activityType",
    label: "Activity Type",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.activityType,
    render: (item) => <ActivityTypeBadge activityType={item.activityType} />,
  },
  {
    id: "activityDateTime",
    label: "Activity Date & Time",
    className: "w-[13%]",
    sortable: true,
    getSortValue: (item) => item.activityDateTime,
    render: (item) => mutedText(item.activityDateTime),
  },
  {
    id: "owner",
    label: "Owner",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.owner,
    render: (item) => mutedText(item.owner),
  },
  {
    id: "location",
    label: "Location",
    className: "w-[12%]",
    sortable: true,
    getSortValue: (item) => item.location,
    render: (item) => mutedText(item.location),
  },
  {
    id: "version",
    label: "Version",
    className: "w-[7%]",
    sortable: true,
    getSortValue: (item) => item.version,
    render: (item) => mutedText(item.version),
  },
]

export const trashColumns: DriveListColumn<TrashItem>[] = [
  {
    id: "name",
    label: "Document Name",
    className: "min-w-[220px]",
    sortable: true,
    getSortValue: (item) => item.name,
    render: renderDocumentName,
  },
  {
    id: "type",
    label: "Document Type",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => getFileKindLabel(item.type),
    render: renderDocumentType,
  },
  {
    id: "originalLocation",
    label: "Original Location",
    className: "w-[13%]",
    sortable: true,
    getSortValue: (item) => item.originalLocation,
    render: (item) => mutedText(item.originalLocation),
  },
  {
    id: "deletedBy",
    label: "Deleted By",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.deletedBy,
    render: (item) => mutedText(item.deletedBy),
  },
  {
    id: "deletedDate",
    label: "Deleted Date",
    className: "w-[10%]",
    sortable: true,
    getSortValue: (item) => item.deletedDate,
    render: (item) => mutedText(item.deletedDate),
  },
  {
    id: "retentionStatus",
    label: "Retention Status",
    className: "w-[11%]",
    sortable: true,
    getSortValue: (item) => item.retentionStatus,
    render: (item) => (
      <RetentionStatusBadge status={item.retentionStatus} />
    ),
  },
  {
    id: "version",
    label: "Version",
    className: "w-[7%]",
    sortable: true,
    getSortValue: (item) => item.version,
    render: (item) => mutedText(item.version),
  },
]
