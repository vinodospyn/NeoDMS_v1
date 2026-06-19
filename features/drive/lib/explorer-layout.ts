import type { FolderNode } from "@/features/drive/data/mock-folder-tree"

export const MY_FOLDERS_DRAWER_WIDTH_PX = 260
export const CERTIFICATION_DRAWER_WIDTH_PX = 340
export const EXPLORER_DRAWER_TRANSITION_MS = 300
export const EXPLORER_DRAWER_EASE = "cubic-bezier(0.32, 0.72, 0, 1)"

export const explorerChromeBarClass =
  "flex h-11 shrink-0 items-center gap-2  bg-background px-4"

export const explorerPanelHeaderClass =
  "flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background px-3"

export const explorerDrawerEdgeLeftClass =
  "border-r border-border/60 shadow-[4px_0_20px_-10px_rgba(15,23,42,0.1)]"

export const explorerDrawerEdgeRightClass =
  "border-l border-border/60 shadow-[-4px_0_20px_-10px_rgba(15,23,42,0.1)]"

export const explorerFolderRowSelectedClass =
  "bg-sky-50/90 text-foreground dark:bg-sky-950/35 dark:text-foreground"

export const explorerFolderToggleClass =
  "drive-explorer-folder-toggle size-9 shrink-0 rounded-[10px] border text-primary shadow-none transition-[filter] hover:brightness-[0.98]"

export const explorerSearchShellClass =
  "drive-explorer-search-shell relative flex h-10 min-w-0 flex-1 items-center rounded-full border pr-1.5"

export const explorerSearchLeadingIconClass =
  " pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"

export const explorerSearchFieldClass =
  "drive-explorer-search-field h-full min-w-0 flex-1 border-0 bg-transparent pl-10 pr-2 shadow-none focus-visible:border-0 focus-visible:ring-0"

export const explorerSearchSubmitClass =
  "drive-explorer-search-submit size-8 shrink-0 rounded-[10px] border shadow-none transition-[filter] hover:brightness-110"

export function getExplorerGridTemplateColumns(
  myFoldersOpen: boolean,
  certificationOpen: boolean
): string {
  const left = myFoldersOpen ? `${MY_FOLDERS_DRAWER_WIDTH_PX}px` : "0px"
  const right = certificationOpen
    ? `${CERTIFICATION_DRAWER_WIDTH_PX}px`
    : "0px"
  return `${left} minmax(0, 1fr) ${right}`
}

export function findFolderLabel(
  tree: FolderNode[],
  id: string
): string | undefined {
  for (const node of tree) {
    if (node.id === id) return node.label
    if (node.children?.length) {
      const match = findFolderLabel(node.children, id)
      if (match) return match
    }
  }
  return undefined
}
