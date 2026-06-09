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
  { label: "Owned by me", href: "/owned-by-me", icon: FileText },
  {
    label: "Shared with me",
    href: "/shared-with-me",
    icon: Users,
  },
  { label: "Shared by me", href: "/shared-by-me", icon: Share2 },
  {
    label: "Quick access",
    href: "/quick-access",
    icon: Star,
  },
  { label: "Recent", href: "/recent", icon: Clock3 },
  { label: "Trash", href: "/trash", icon: Trash2 },
]

/** Footer nav item (separated from main list in sidebar UI). */
export const sidebarSettingsNavItem: NavItem = {
  label: "Settings",
  href: "/settings",
  icon: Settings,
}
