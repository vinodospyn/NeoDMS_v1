import type { DriveFileKind } from "@/features/drive/lib/file-types"

export type QuickAccessItem = {
  id: string
  name: string
  subtitle: string
  kind: DriveFileKind
  shared?: boolean
}

export type RecentFileItem = {
  id: string
  name: string
  subtitle: string
  type: DriveFileKind
  tag?: { label: string; className: string }
  openedAt: string
  previewClassName: string
}

/** Two rows × five columns — matches dashboard Quick access mockup. */
export const quickAccessItems: QuickAccessItem[] = [
  {
    id: "qa-1",
    name: "Desktop",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-2",
    name: "Downloads",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-3",
    name: "Documents",
    subtitle: "John Doe - Personal",
    kind: "shared-folder",
  },
  {
    id: "qa-4",
    name: "Photos",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-5",
    name: "Pictures",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-6",
    name: "Downloads",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-7",
    name: "Captures",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-8",
    name: "Personal",
    subtitle: "John Doe - Personal",
    kind: "folder",
  },
  {
    id: "qa-9",
    name: "Agreement.docx",
    subtitle: "John Doe - Personal",
    kind: "word",
  },
  {
    id: "qa-10",
    name: "Agreement.pdf",
    subtitle: "HR - Confidential",
    kind: "pdf",
  },
]

export const recentFileItems: RecentFileItem[] = [
  {
    id: "rf-1",
    name: "Lease Agreement.pdf",
    subtitle: "John Doe - Personal",
    type: "pdf",
    tag: { label: "HR", className: "bg-emerald-100 text-emerald-800" },
    openedAt: "Opened Feb 27, 2028 - 05:53 PM",
    previewClassName: "bg-gradient-to-br from-rose-50 to-rose-100",
  },
  {
    id: "rf-2",
    name: "Cover Letter.docx",
    subtitle: "John Doe - Personal",
    type: "word",
    openedAt: "Opened Feb 27, 2028 - 05:53 PM",
    previewClassName: "bg-gradient-to-br from-sky-50 to-sky-100",
  },
  {
    id: "rf-3",
    name: "PAN.jpg",
    subtitle: "John Doe - Personal",
    type: "image",
    openedAt: "Opened Feb 27, 2028 - 05:53 PM",
    previewClassName: "bg-gradient-to-br from-amber-50 to-orange-100",
  },
  {
    id: "rf-4",
    name: "Account Opening Form",
    subtitle: "John Doe - Personal",
    type: "pdf",
    tag: { label: "Finance", className: "bg-emerald-100 text-emerald-800" },
    openedAt: "Opened Feb 27, 2028 - 05:53 PM",
    previewClassName: "bg-gradient-to-br from-slate-50 to-slate-100",
  },
  {
    id: "rf-5",
    name: "HR Policy.docx",
    subtitle: "John Doe - Personal",
    type: "word",
    tag: { label: "HR", className: "bg-emerald-100 text-emerald-800" },
    openedAt: "Opened Feb 27, 2028 - 05:53 PM",
    previewClassName: "bg-gradient-to-br from-violet-50 to-violet-100",
  },
  {
    id: "rf-6",
    name: "John Doe.png",
    subtitle: "John Doe - Personal",
    type: "image",
    openedAt: "Opened Feb 27, 2028 - 05:53 PM",
    previewClassName: "bg-gradient-to-br from-cyan-50 to-teal-100",
  },
]
