import type { NavItem } from "@/config/nav/types"
import {
  Clock3,
  Folder,
  HardDrive,
  Home,
  Settings,
  Star,
  Trash2,
  Users,
} from "lucide-react"

/** Primary drive navigation (matches DMS sidebar design). */
export const sidebarNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Personal Space", href: "/personal-space", icon: HardDrive },
  {
    label: "Workspaces",
    href: "/workspaces",
    icon: HardDrive,
    children: [
      { label: "Finance", href: "/workspaces/finance", icon: Folder },
      {
        label: "Human Resource",
        href: "/workspaces/human-resource",
        icon: Folder,
      },
      { label: "Marketing", href: "/workspaces/marketing", icon: Folder },
    ],
  },
  { label: "Shared with me", href: "/shared-with-me", icon: Users },
  { label: "Favorite", href: "/favorite", icon: Star },
  { label: "Recent", href: "/recent", icon: Clock3 },
  { label: "Trash", href: "/trash", icon: Trash2 },
]

/** Footer nav item (separated from main list in sidebar UI). */
export const sidebarSettingsNavItem: NavItem = {
  label: "Settings",
  href: "/settings",
  icon: Settings,
}

export function flattenSidebarNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) =>
    item.children?.length
      ? item.children.map((child) => ({
          label: child.label,
          href: child.href,
          icon: child.icon,
        }))
      : [item]
  )
}
