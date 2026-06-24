import type { NavItem, NavSubItem } from "@/config/nav/types"

type NavMatchOptions = Pick<NavSubItem, "matchDescendants">

export function isNavItemActive(
  pathname: string,
  href: string,
  options?: NavMatchOptions
): boolean {
  if (href === "/") return pathname === href
  if (options?.matchDescendants) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }
  return pathname === href
}

export function isNavGroupActive(pathname: string, item: NavItem): boolean {
  if (item.children?.length) {
    return (
      isNavItemActive(pathname, item.href, {
        matchDescendants: item.matchDescendants,
      }) ||
      item.children.some((child) =>
        isNavItemActive(pathname, child.href, {
          matchDescendants: child.matchDescendants,
        })
      )
    )
  }
  return isNavItemActive(pathname, item.href, {
    matchDescendants: item.matchDescendants,
  })
}
