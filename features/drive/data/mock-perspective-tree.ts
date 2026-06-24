import type { DriveFileKind } from "@/features/drive/lib/file-types"

export type PerspectiveTreeNode = {
  id: string
  label: string
  kind: DriveFileKind
  shared?: boolean
  createdAt?: string
  children?: PerspectiveTreeNode[]
}

export const mockPerspectiveTree: PerspectiveTreeNode[] = [
  {
    id: "2",
    label: "Certificates",
    kind: "shared-folder",
    shared: true,
    createdAt: "11-02-2026",
    children: [
      {
        id: "identity-proof",
        label: "Identity Proof",
        kind: "folder",
        createdAt: "08-01-2026",
        children: [
          {
            id: "aadhaar",
            label: "Aadhaar_Doc.pdf",
            kind: "pdf",
            createdAt: "11-02-2026",
          },
          {
            id: "identity-doc",
            label: "Identity_Doc.pdf",
            kind: "pdf",
            createdAt: "10-02-2026",
          },
        ],
      },
      {
        id: "latest-docs",
        label: "Latest Documents",
        kind: "folder",
        createdAt: "05-01-2026",
        children: [
          {
            id: "offer-letter",
            label: "Offer_Letter.pdf",
            kind: "pdf",
            createdAt: "05-01-2026",
          },
        ],
      },
      {
        id: "other-docs",
        label: "Other Documents",
        kind: "folder",
        createdAt: "01-12-2025",
      },
    ],
  },
]
