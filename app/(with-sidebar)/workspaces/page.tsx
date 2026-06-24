import { redirect } from "next/navigation"

import { getDefaultWorkspaceSlug } from "@/features/workspace/data/mock-workspace-content"

export default function WorkspacesIndexPage() {
  redirect(`/workspaces/${getDefaultWorkspaceSlug()}`)
}
