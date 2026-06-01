import { headerNavItems } from "@/config/nav/header-nav"
import { sharedNavItems } from "@/config/nav/shared-nav"
import { sidebarNavItems } from "@/config/nav/sidebar-nav"
import { navMode } from "@/config/nav/settings"
import type { NavItem } from "@/config/nav/types"

export function getHeaderNavItems(): NavItem[] {
  return navMode === "shared" ? sharedNavItems : headerNavItems
}

export function getSidebarNavItems(): NavItem[] {
  return navMode === "shared" ? sharedNavItems : sidebarNavItems
}
