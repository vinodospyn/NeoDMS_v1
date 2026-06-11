import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import {
  mockDocumentComments,
  type DocumentComment,
} from "@/features/drive/data/mock-document-comments"

function isFolderNode(node: PerspectiveTreeNode) {
  return node.kind === "folder" || node.kind === "shared-folder"
}

export function isPerspectiveDocument(
  node: PerspectiveTreeNode | null
): node is PerspectiveTreeNode {
  return node != null && !isFolderNode(node)
}

export function getDocumentComments(
  node: PerspectiveTreeNode | null
): DocumentComment[] {
  if (!isPerspectiveDocument(node)) {
    return []
  }

  if (mockDocumentComments[node.id]) {
    return mockDocumentComments[node.id]
  }

  const label = node.label.toLowerCase()

  if (label.includes("aadhaar")) {
    return mockDocumentComments.aadhaar
  }

  if (label.includes("identity")) {
    return mockDocumentComments["identity-doc"]
  }

  if (label.includes("offer")) {
    return mockDocumentComments["offer-letter"]
  }

  return []
}

export function formatCommentTime(date = new Date()) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })
}
