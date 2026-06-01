export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href
  // For sidebar items we want a single, precise active state, so only match
  // when the pathname exactly equals the item's href.
  return pathname === href
}
