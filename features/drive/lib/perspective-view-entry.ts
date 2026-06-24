import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import type { DriveFileKind } from "@/features/drive/lib/file-types"
import {
  findPerspectiveNode,
  getDefaultExpandedIds,
  isFolderKind,
} from "@/features/drive/lib/perspective-tree"

export type PerspectiveViewMode = "browse" | "single"

export type PerspectiveEntryHint = {
  kind?: DriveFileKind
  name?: string
}

export type PerspectiveSession = {
  mode: PerspectiveViewMode
  selectedId: string
  tree: PerspectiveTreeNode[]
  contextNode: PerspectiveTreeNode
  selectedNode: PerspectiveTreeNode | null
  expandedIds: Set<string>
}

const PERSPECTIVE_ID_ALIASES: Record<string, string> = {
  "7": "aadhaar",
  "fav-1": "2",
  "fav-2": "aadhaar",
}

type PerspectiveViewItem = {
  id: string
  name: string
  type: DriveFileKind
}

export function buildPerspectiveViewHref(item: PerspectiveViewItem) {
  const params = new URLSearchParams({
    id: item.id,
    kind: item.type,
    name: item.name,
  })
  return `/perspective-view?${params.toString()}`
}

export function resolvePerspectiveEntryId(id: string, name?: string) {
  if (PERSPECTIVE_ID_ALIASES[id]) {
    return PERSPECTIVE_ID_ALIASES[id]
  }

  const normalizedName = name?.trim().toLowerCase() ?? ""
  if (normalizedName.includes("aadhaar")) return "aadhaar"
  if (normalizedName.includes("identity_doc") || normalizedName.includes("identity doc")) {
    return "identity-doc"
  }
  if (normalizedName.includes("offer_letter") || normalizedName.includes("offer letter")) {
    return "offer-letter"
  }
  if (normalizedName === "certificates") return "2"

  return id
}

function createSyntheticNode(
  id: string,
  hint: PerspectiveEntryHint
): PerspectiveTreeNode | undefined {
  if (!hint.kind || !hint.name) return undefined

  return {
    id,
    label: hint.name,
    kind: hint.kind,
    shared: hint.kind === "shared-folder",
  }
}

export function resolvePerspectiveSession(
  fullTree: PerspectiveTreeNode[],
  entryId: string | null,
  hint: PerspectiveEntryHint = {}
): PerspectiveSession {
  const resolvedId = entryId
    ? resolvePerspectiveEntryId(entryId, hint.name)
    : null

  let entryNode =
    (resolvedId ? findPerspectiveNode(fullTree, resolvedId) : undefined) ??
    createSyntheticNode(resolvedId ?? entryId ?? "", hint)

  if (!entryNode && fullTree[0]) {
    entryNode = fullTree[0]
  }

  if (!entryNode) {
    return {
      mode: "single",
      selectedId: "",
      tree: [],
      contextNode: {
        id: "",
        label: "Document",
        kind: "pdf",
      },
      selectedNode: null,
      expandedIds: new Set(),
    }
  }

  if (isFolderKind(entryNode.kind)) {
    const tree = entryNode.children ?? []
    const selectedId = tree[0]?.id ?? entryNode.id
    const selectedNode =
      findPerspectiveNode(tree, selectedId) ??
      findPerspectiveNode(fullTree, selectedId) ??
      entryNode

    return {
      mode: "browse",
      selectedId,
      tree,
      contextNode: entryNode,
      selectedNode,
      expandedIds: getDefaultExpandedIds(tree, selectedId),
    }
  }

  return {
    mode: "single",
    selectedId: entryNode.id,
    tree: [],
    contextNode: entryNode,
    selectedNode: entryNode,
    expandedIds: new Set(),
  }
}
