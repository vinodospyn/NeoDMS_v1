"use client"

import * as React from "react"

import { useSidebar } from "@/components/ui/sidebar"

/**
 * Collapses the app sidebar while the My Folders drawer is open on the explorer page.
 * Restores the previous sidebar state when the drawer closes or the user leaves the page.
 */
export function useCollapseAppSidebarForFoldersDrawer(
  myFoldersDrawerOpen: boolean
) {
  const { open, setOpen, isMobile, openMobile, setOpenMobile } = useSidebar()
  const prevDrawerOpen = React.useRef(false)
  const sidebarSnapshot = React.useRef<boolean | null>(null)
  const sidebarApiRef = React.useRef({ isMobile, setOpen, setOpenMobile })

  React.useEffect(() => {
    sidebarApiRef.current = { isMobile, setOpen, setOpenMobile }
  })

  React.useEffect(() => {
    const justOpened = myFoldersDrawerOpen && !prevDrawerOpen.current
    const justClosed = !myFoldersDrawerOpen && prevDrawerOpen.current
    prevDrawerOpen.current = myFoldersDrawerOpen

    if (justOpened) {
      const wasOpen = isMobile ? openMobile : open
      sidebarSnapshot.current = wasOpen
      if (wasOpen) {
        if (isMobile) setOpenMobile(false)
        else setOpen(false)
      }
      return
    }

    if (justClosed && sidebarSnapshot.current !== null) {
      const restore = sidebarSnapshot.current
      if (isMobile) setOpenMobile(restore)
      else setOpen(restore)
      sidebarSnapshot.current = null
    }
  }, [
    myFoldersDrawerOpen,
    open,
    openMobile,
    isMobile,
    setOpen,
    setOpenMobile,
  ])

  React.useEffect(() => {
    return () => {
      const previous = sidebarSnapshot.current
      if (previous === null) return
      const { isMobile: mobile, setOpen, setOpenMobile } = sidebarApiRef.current
      if (mobile) setOpenMobile(previous)
      else setOpen(previous)
      sidebarSnapshot.current = null
    }
  }, [])
}
