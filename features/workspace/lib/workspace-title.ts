import { findMockWorkspaceBySlug } from "@/features/workspace/data/mock-workspaces-nav"

export function getWorkspacePageTitle(pathname: string): string | null {
  if (!pathname.startsWith("/workspaces/")) return null

  const segments = pathname.split("/").filter(Boolean)
  const slug = segments[1]
  if (!slug || slug === "new" || segments[2] === "edit") return null

  const fromCatalog = findMockWorkspaceBySlug(slug)
  if (fromCatalog) return fromCatalog.name

  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
