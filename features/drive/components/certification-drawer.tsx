"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { FileQuickViewPanel } from "@/features/drive/components/file-quick-view-panel"
import type { DriveItem } from "@/features/drive/types"
import { explorerDrawerContentEase } from "@/features/drive/lib/explorer-motion"

type CertificationDrawerProps = {
  open: boolean
  selectedItem: DriveItem | null
  onClose: () => void
}

export function CertificationDrawer({
  open,
  selectedItem,
  onClose,
}: CertificationDrawerProps) {
  const reduceMotion = useReducedMotion()

  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: explorerDrawerContentEase }

  return (
    <AnimatePresence initial={false} mode="wait">
      {open ? (
        <motion.div
          key="certification-drawer-content"
          role="complementary"
          aria-label="Quick view"
          initial={reduceMotion ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: 8 }}
          transition={contentTransition}
          className="flex h-full w-full min-w-0 flex-col overflow-hidden bg-background"
        >
          <FileQuickViewPanel
            selectedItem={selectedItem}
            onClose={onClose}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
