import type { NavItem } from "@/config/nav/types"
import {
  Clock3,
  FileText,
  LayoutDashboard,
  Share2,
  Star,
  Trash2,
  Settings,
  Users,
} from "lucide-react"

/** Primary drive navigation (matches DMS dashboard design). */
export const sidebarNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Owned by me", href: "/sample-sidebar/documents", icon: FileText },
  {
    label: "Shared with me",
    href: "/sample-sidebar/shared-with-me",
    icon: Users,
  },
  { label: "Shared by me", href: "/sample-sidebar/shared-by-me", icon: Share2 },
  {
    label: "Quick access",
    href: "/sample-sidebar/quick-access",
    icon: Star,
  },
  { label: "Recent", href: "/sample-sidebar/recent", icon: Clock3 },
  { label: "Trash", href: "/sample-sidebar/trash", icon: Trash2 },
]

/** Footer nav item (separated from main list in sidebar UI). */
export const sidebarSettingsNavItem: NavItem = {
  label: "Settings",
  href: "/sample-sidebar/settings",
  icon: Settings,
}
