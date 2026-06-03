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

  const sidebarStateRef = React.useRef({ open, openMobile, isMobile })
  sidebarStateRef.current = { open, openMobile, isMobile }

  const setSidebarRef = React.useRef({ setOpen, setOpenMobile })
  setSidebarRef.current = { setOpen, setOpenMobile }

  React.useEffect(() => {
    const justOpened = myFoldersDrawerOpen && !prevDrawerOpen.current
    const justClosed = !myFoldersDrawerOpen && prevDrawerOpen.current
    prevDrawerOpen.current = myFoldersDrawerOpen

    if (justOpened) {
      const { open: desktopOpen, openMobile: mobileOpen, isMobile: mobile } =
        sidebarStateRef.current
      const wasOpen = mobile ? mobileOpen : desktopOpen
      sidebarSnapshot.current = wasOpen
      if (wasOpen) {
        if (mobile) setSidebarRef.current.setOpenMobile(false)
        else setSidebarRef.current.setOpen(false)
      }
      return
    }

    if (justClosed && sidebarSnapshot.current !== null) {
      const restore = sidebarSnapshot.current
      const { isMobile: mobile } = sidebarStateRef.current
      if (mobile) setSidebarRef.current.setOpenMobile(restore)
      else setSidebarRef.current.setOpen(restore)
      sidebarSnapshot.current = null
    }
  }, [myFoldersDrawerOpen])

  React.useEffect(() => {
    return () => {
      const previous = sidebarSnapshot.current
      if (previous === null) return
      const { isMobile: mobile } = sidebarStateRef.current
      if (mobile) setSidebarRef.current.setOpenMobile(previous)
      else setSidebarRef.current.setOpen(previous)
      sidebarSnapshot.current = null
    }
  }, [])
}
