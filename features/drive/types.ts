export type DriveItemType = "folder" | "pdf" | "docx" | "zip" | "image"

export type DriveItem = {
  id: string
  name: string
  type: DriveItemType
  category: string
  workspace: string
  createdAt: string
  fileSize: string | null
  starred?: boolean
}

export type DriveSortKey = "name" | "createdAt"
export type DriveSortDirection = "asc" | "desc"
