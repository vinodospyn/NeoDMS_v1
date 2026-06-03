"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { FolderTreePanel } from "@/features/drive/components/folder-tree-panel"
import type { FolderNode } from "@/features/drive/data/mock-folder-tree"
import { explorerDrawerContentEase } from "@/features/drive/lib/explorer-motion"

type MyFoldersDrawerProps = {
  open: boolean
  tree: FolderNode[]
  selectedId: string
  onSelectedIdChange: (id: string) => void
  onClose: () => void
}

export function MyFoldersDrawer({
  open,
  tree,
  selectedId,
  onSelectedIdChange,
  onClose,
}: MyFoldersDrawerProps) {
  const reduceMotion = useReducedMotion()

  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: explorerDrawerContentEase }

  return (
    <AnimatePresence initial={false} mode="wait">
      {open ? (
        <motion.div
          key="my-folders-drawer-content"
          role="navigation"
          aria-label="My folders"
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
          transition={contentTransition}
          className="flex h-full w-full min-w-0 flex-col overflow-hidden bg-background"
        >
          <FolderTreePanel
            tree={tree}
            selectedId={selectedId}
            onSelectedIdChange={onSelectedIdChange}
            onClose={onClose}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
