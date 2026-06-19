import type { NavItem } from "@/config/nav/types"

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href
  // For sidebar items we want a single, precise active state, so only match
  // when the pathname exactly equals the item's href.
  return pathname === href
}

export function isNavGroupActive(pathname: string, item: NavItem): boolean {
  if (item.children?.length) {
    return item.children.some((child) => isNavItemActive(pathname, child.href))
  }
  return isNavItemActive(pathname, item.href)
}
