export type StorageCategory = {
  id: string
  label: string
  itemCount: number
  sizeGb: number
  barClassName: string
  dotClassName: string
}

export type DocumentStorageOverview = {
  totalSizeGb: number
  totalFiles: number
  categories: StorageCategory[]
}

export type DocumentFileStorageInfo = {
  sizeMb: number
  pageCount?: number
}

const certificatesStorage: DocumentStorageOverview = {
  totalSizeGb: 24.5,
  totalFiles: 1240,
  categories: [
    {
      id: "pdf",
      label: "PDF Files",
      itemCount: 450,
      sizeGb: 11.0,
      barClassName: "bg-rose-500",
      dotClassName: "bg-rose-500",
    },
    {
      id: "excel",
      label: "Excel Sheets",
      itemCount: 320,
      sizeGb: 7.3,
      barClassName: "bg-emerald-500",
      dotClassName: "bg-emerald-500",
    },
    {
      id: "word",
      label: "Word Documents",
      itemCount: 280,
      sizeGb: 3.7,
      barClassName: "bg-sky-400",
      dotClassName: "bg-sky-400",
    },
    {
      id: "images",
      label: "Images & Media",
      itemCount: 190,
      sizeGb: 2.5,
      barClassName: "bg-violet-500",
      dotClassName: "bg-violet-500",
    },
    {
      id: "other",
      label: "Other",
      itemCount: 0,
      sizeGb: 0,
      barClassName: "bg-slate-400",
      dotClassName: "bg-slate-400",
    },
  ],
}

export const mockDocumentStorage: Record<string, DocumentStorageOverview> = {
  "2": certificatesStorage,
  "identity-proof": {
    totalSizeGb: 18.2,
    totalFiles: 860,
    categories: [
      {
        id: "pdf",
        label: "PDF Files",
        itemCount: 320,
        sizeGb: 12.4,
        barClassName: "bg-rose-500",
        dotClassName: "bg-rose-500",
      },
      {
        id: "excel",
        label: "Excel Sheets",
        itemCount: 180,
        sizeGb: 3.1,
        barClassName: "bg-emerald-500",
        dotClassName: "bg-emerald-500",
      },
      {
        id: "word",
        label: "Word Documents",
        itemCount: 210,
        sizeGb: 2.2,
        barClassName: "bg-sky-400",
        dotClassName: "bg-sky-400",
      },
      {
        id: "images",
        label: "Images & Media",
        itemCount: 95,
        sizeGb: 0.5,
        barClassName: "bg-violet-500",
        dotClassName: "bg-violet-500",
      },
      {
        id: "other",
        label: "Other",
        itemCount: 55,
        sizeGb: 0,
        barClassName: "bg-slate-400",
        dotClassName: "bg-slate-400",
      },
    ],
  },
}

export const mockDocumentFileStorage: Record<string, DocumentFileStorageInfo> = {
  aadhaar: { sizeMb: 2.5, pageCount: 2 },
  "identity-doc": { sizeMb: 1.8, pageCount: 4 },
  "offer-letter": { sizeMb: 0.9, pageCount: 3 },
}

export const defaultDocumentFileStorage: DocumentFileStorageInfo = {
  sizeMb: 2.5,
  pageCount: 2,
}

export const defaultDocumentStorage = certificatesStorage
