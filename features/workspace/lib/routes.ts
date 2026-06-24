export type WorkspaceRoutes = {
  list: string
  new: string
  edit: (id: string) => string
}

/** Workspace administration lives under Settings → Workspace Management. */
export const workspaceSettingsRoutes: WorkspaceRoutes = {
  list: "/settings/workspace-management/workspaces",
  new: "/settings/workspace-management/workspaces/new",
  edit: (id: string) =>
    `/settings/workspace-management/workspaces/${id}/edit`,
}

/** @deprecated Use workspaceSettingsRoutes — kept for redirects from legacy URLs. */
export const workspaceDriveRoutes: WorkspaceRoutes = {
  list: "/workspaces",
  new: "/workspaces/new",
  edit: (id: string) => `/workspaces/${id}/edit`,
}
