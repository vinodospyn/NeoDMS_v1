import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import type { DriveFileKind } from "@/features/drive/lib/file-types"

export function isFolderKind(kind: DriveFileKind): boolean {
  return kind === "folder" || kind === "shared-folder"
}

export function isPreviewableFile(kind: DriveFileKind): boolean {
  return !isFolderKind(kind)
}

function nodeContainsId(node: PerspectiveTreeNode, id: string): boolean {
  if (node.id === id) return true
  return node.children?.some((child) => nodeContainsId(child, id)) ?? false
}

/** Top-level folder this perspective session opened under (header context). */
export function getPerspectiveRootNode(
  tree: PerspectiveTreeNode[],
  entryId: string
): PerspectiveTreeNode | undefined {
  if (!tree.length) return undefined

  for (const root of tree) {
    if (!entryId || root.id === entryId || nodeContainsId(root, entryId)) {
      return root
    }
  }

  return tree[0]
}

export function findPerspectiveNode(
  tree: PerspectiveTreeNode[],
  id: string
): PerspectiveTreeNode | undefined {
  for (const node of tree) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findPerspectiveNode(node.children, id)
      if (found) return found
    }
  }
  return undefined
}

export function getDefaultExpandedIds(
  tree: PerspectiveTreeNode[],
  selectedId: string
): Set<string> {
  const expanded = new Set<string>()

  function walk(nodes: PerspectiveTreeNode[], ancestors: string[]): boolean {
    for (const node of nodes) {
      const path = [...ancestors, node.id]
      if (node.id === selectedId) {
        path.slice(0, -1).forEach((id) => expanded.add(id))
        return true
      }
      if (node.children?.length && walk(node.children, path)) {
        expanded.add(node.id)
        return true
      }
    }
    return false
  }

  walk(tree, [])
  if (expanded.size === 0 && tree[0]) {
    expanded.add(tree[0].id)
    if (tree[0].children?.[0]) expanded.add(tree[0].children[0].id)
  }
  return expanded
}

export function filterPerspectiveTree(
  tree: PerspectiveTreeNode[],
  query: string
): PerspectiveTreeNode[] {
  const term = query.trim().toLowerCase()
  if (!term) return tree

  function filterNodes(nodes: PerspectiveTreeNode[]): PerspectiveTreeNode[] {
    return nodes.reduce<PerspectiveTreeNode[]>((acc, node) => {
      const children = node.children ? filterNodes(node.children) : undefined
      const labelMatch = node.label.toLowerCase().includes(term)
      const hasMatchingChildren = Boolean(children?.length)

      if (labelMatch || hasMatchingChildren) {
        acc.push({
          ...node,
          children: hasMatchingChildren ? children : labelMatch ? node.children : undefined,
        })
      }
      return acc
    }, [])
  }

  return filterNodes(tree)
}

export function formatPerspectiveSubtitle(createdAt?: string) {
  return createdAt ? `Created on : ${createdAt}` : undefined
}

/** Matches drive sidebar active nav — uses `--primary` from the accent palette. */
export const perspectiveTreeRowSelectedClass =
  "bg-primary/20 text-primary font-medium dark:bg-primary/30 dark:text-primary"
