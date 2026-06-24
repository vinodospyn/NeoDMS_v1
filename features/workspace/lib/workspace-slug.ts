/** URL slug from workspace code (e.g. FINANCE → finance, human-resource → human-resource). */
export function workspaceCodeToSlug(code: string): string {
  return code.trim().toLowerCase().replace(/_/g, "-")
}

export function workspaceSlugToCode(slug: string): string {
  return slug.trim().toUpperCase().replace(/-/g, "_")
}
