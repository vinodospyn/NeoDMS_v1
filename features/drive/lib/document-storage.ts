import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import {
  defaultDocumentFileStorage,
  defaultDocumentStorage,
  mockDocumentFileStorage,
  mockDocumentStorage,
  type DocumentFileStorageInfo,
  type DocumentStorageOverview,
} from "@/features/drive/data/mock-document-storage"
import { isPerspectiveDocument } from "@/features/drive/lib/document-comments"

function isFolderNode(node: PerspectiveTreeNode) {
  return node.kind === "folder" || node.kind === "shared-folder"
}

export function getDocumentStorage(
  node: PerspectiveTreeNode | null
): DocumentStorageOverview | null {
  if (!node) {
    return null
  }

  if (mockDocumentStorage[node.id]) {
    return mockDocumentStorage[node.id]
  }

  if (isFolderNode(node)) {
    return defaultDocumentStorage
  }

  return null
}

export function getDocumentFileStorage(
  node: PerspectiveTreeNode | null
): DocumentFileStorageInfo | null {
  if (!isPerspectiveDocument(node)) {
    return null
  }

  if (mockDocumentFileStorage[node.id]) {
    return mockDocumentFileStorage[node.id]
  }

  if (node.kind === "pdf") {
    return defaultDocumentFileStorage
  }

  return { sizeMb: defaultDocumentFileStorage.sizeMb }
}

export function getStorageCategoryPercent(
  sizeGb: number,
  totalSizeGb: number
) {
  if (totalSizeGb <= 0) {
    return 0
  }

  return (sizeGb / totalSizeGb) * 100
}
