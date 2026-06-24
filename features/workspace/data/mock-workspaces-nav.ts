import { workspaceCodeToSlug } from "@/features/workspace/lib/workspace-slug"

/** Fallback workspace catalog when the API list is unavailable. */
export const mockWorkspaceCatalog = [
  { code: "HR", name: "HR" },
  { code: "FINANCE", name: "Finance" },
  { code: "MARKETING", name: "Marketing" },
  { code: "LEGAL", name: "Legal" },
  { code: "OPERATIONS", name: "Operations" },
  { code: "IT", name: "IT" },
] as const

export const mockWorkspaceNavEntries = mockWorkspaceCatalog.map((workspace) => ({
  label: workspace.name,
  href: `/workspaces/${workspaceCodeToSlug(workspace.code)}`,
  matchDescendants: true as const,
}))

export function findMockWorkspaceBySlug(slug: string) {
  return mockWorkspaceCatalog.find(
    (workspace) => workspaceCodeToSlug(workspace.code) === slug
  )
}
