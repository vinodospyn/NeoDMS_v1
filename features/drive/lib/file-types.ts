/** Canonical file/folder kinds for Neo Drive UI. */
export type DriveFileKind =
  | "folder"
  | "shared-folder"
  | "pdf"
  | "word"
  | "excel"
  | "ppt"
  | "txt"
  | "zip"
  | "image"
  | "unknown"

const EXTENSION_TO_KIND: Record<string, DriveFileKind> = {
  pdf: "pdf",
  doc: "word",
  docx: "word",
  dot: "word",
  dotx: "word",
  xls: "excel",
  xlsx: "excel",
  xlsm: "excel",
  csv: "excel",
  ppt: "ppt",
  pptx: "ppt",
  pps: "ppt",
  ppsx: "ppt",
  txt: "txt",
  md: "txt",
  rtf: "txt",
  zip: "zip",
  rar: "zip",
  "7z": "zip",
  tar: "zip",
  gz: "zip",
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  bmp: "image",
  heic: "image",
}

const EXPLICIT_TYPE_ALIASES: Record<string, DriveFileKind> = {
  folder: "folder",
  "shared-folder": "shared-folder",
  shared: "shared-folder",
  pdf: "pdf",
  word: "word",
  doc: "word",
  docx: "word",
  excel: "excel",
  xls: "excel",
  xlsx: "excel",
  ppt: "ppt",
  pptx: "ppt",
  txt: "txt",
  zip: "zip",
  archive: "zip",
  image: "image",
  img: "image",
  jpg: "image",
  jpeg: "image",
  png: "image",
  unknown: "unknown",
  file: "unknown",
}

export function getFileExtension(filename: string): string {
  const base = filename.trim().split(/[\\/]/).pop() ?? filename
  const dot = base.lastIndexOf(".")
  if (dot <= 0 || dot === base.length - 1) return ""
  return base.slice(dot + 1).toLowerCase()
}

export function normalizeExplicitFileKind(
  value?: string | null
): DriveFileKind | undefined {
  if (!value) return undefined
  const key = value.trim().toLowerCase()
  return EXPLICIT_TYPE_ALIASES[key]
}

/** Resolve icon kind from optional API/mock type and/or filename. */
export function resolveFileKind(
  name?: string | null,
  explicitType?: string | null
): DriveFileKind {
  const fromExplicit = normalizeExplicitFileKind(explicitType)
  if (fromExplicit) return fromExplicit

  if (name) {
    const ext = getFileExtension(name)
    if (ext && EXTENSION_TO_KIND[ext]) return EXTENSION_TO_KIND[ext]
  }

  return "unknown"
}

export function getFileKindLabel(kind: DriveFileKind): string {
  switch (kind) {
    case "folder":
      return "Folder"
    case "shared-folder":
      return "Shared folder"
    case "pdf":
      return "PDF"
    case "word":
      return "Word document"
    case "excel":
      return "Excel spreadsheet"
    case "ppt":
      return "PowerPoint"
    case "txt":
      return "Text file"
    case "zip":
      return "Archive"
    case "image":
      return "Image"
    default:
      return "File"
  }
}
