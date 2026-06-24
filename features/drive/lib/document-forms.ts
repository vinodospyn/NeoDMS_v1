import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import {
  documentFormSchemas,
  type DocumentFormSchema,
} from "@/features/drive/data/document-form-schemas"

function isFolderNode(node: PerspectiveTreeNode) {
  return node.kind === "folder" || node.kind === "shared-folder"
}

export function getDocumentFormSchema(
  node: PerspectiveTreeNode | null
): DocumentFormSchema | null {
  if (!node || isFolderNode(node)) {
    return null
  }

  if (documentFormSchemas[node.id]) {
    return documentFormSchemas[node.id]
  }

  const label = node.label.toLowerCase()

  if (label.includes("aadhaar")) {
    return documentFormSchemas.aadhaar
  }

  if (label.includes("identity")) {
    return documentFormSchemas["identity-doc"]
  }

  if (label.includes("offer")) {
    return documentFormSchemas["offer-letter"]
  }

  return documentFormSchemas["identity-doc"]
}
