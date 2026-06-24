"use client"

import * as React from "react"

import { FileExplorerPage } from "@/features/drive/components/file-explorer-page"
import type { FileExplorerContext } from "@/features/drive/types/explorer-context"
import {
  findMockWorkspaceBySlug,
  mockWorkspaceCatalog,
} from "@/features/workspace/data/mock-workspaces-nav"
import { getWorkspaceContentItems } from "@/features/workspace/data/mock-workspace-content"
import { useWorkspaces } from "@/features/workspace/hooks/use-workspaces"
import { workspaceCodeToSlug } from "@/features/workspace/lib/workspace-slug"

type WorkspaceExplorerPageProps = {
  slug: string
}

function resolveWorkspaceName(
  slug: string,
  apiItems: { code: string; name: string }[] | undefined
) {
  const fromApi = apiItems?.find(
    (workspace) => workspaceCodeToSlug(workspace.code) === slug
  )
  if (fromApi) return fromApi.name

  const fromMock = findMockWorkspaceBySlug(slug)
  if (fromMock) return fromMock.name

  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function WorkspaceExplorerPage({ slug }: WorkspaceExplorerPageProps) {
  const { data } = useWorkspaces({ page: 0, size: 100, sort: "name,asc" })
  const apiItems = data?.items

  const workspaceName = React.useMemo(
    () => resolveWorkspaceName(slug, apiItems),
    [apiItems, slug]
  )

  const isKnownWorkspace = React.useMemo(() => {
    if (apiItems?.some((w) => workspaceCodeToSlug(w.code) === slug)) return true
    return mockWorkspaceCatalog.some(
      (workspace) => workspaceCodeToSlug(workspace.code) === slug
    )
  }, [apiItems, slug])

  const context = React.useMemo<FileExplorerContext>(
    () => ({
      rootLabel: "Workspaces",
      rootHref: "#",
      pathCrumbs: [{ label: workspaceName }],
      defaultFolderLabel: workspaceName,
      items: getWorkspaceContentItems(slug, workspaceName),
    }),
    [slug, workspaceName]
  )

  if (!isKnownWorkspace && apiItems?.length) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <p className="text-sm text-muted-foreground">Workspace not found.</p>
      </div>
    )
  }

  return <FileExplorerPage context={context} />
}
