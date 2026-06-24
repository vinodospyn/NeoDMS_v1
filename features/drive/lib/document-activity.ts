import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import {
  defaultFolderActivity,
  mockDocumentActivity,
  type DocumentActivityEvent,
} from "@/features/drive/data/mock-document-activity"

function isFolderNode(node: PerspectiveTreeNode) {
  return node.kind === "folder" || node.kind === "shared-folder"
}

export function getDocumentActivity(
  node: PerspectiveTreeNode | null
): DocumentActivityEvent[] {
  if (!node) {
    return []
  }

  if (mockDocumentActivity[node.id]) {
    return mockDocumentActivity[node.id]
  }

  const label = node.label.toLowerCase()

  if (label.includes("aadhaar")) {
    return mockDocumentActivity.aadhaar
  }

  if (label.includes("identity")) {
    return isFolderNode(node)
      ? mockDocumentActivity["identity-proof"]
      : mockDocumentActivity["identity-doc"]
  }

  if (label.includes("offer")) {
    return mockDocumentActivity["offer-letter"]
  }

  if (isFolderNode(node)) {
    return defaultFolderActivity
  }

  return []
}
