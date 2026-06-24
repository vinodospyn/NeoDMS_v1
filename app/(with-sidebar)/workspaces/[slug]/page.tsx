import { WorkspaceExplorerPage } from "@/features/workspace/components/workspace-explorer-page"

type WorkspaceSlugPageProps = {
  params: Promise<{ slug: string }>
}

export default async function WorkspaceSlugPage({ params }: WorkspaceSlugPageProps) {
  const { slug } = await params
  return <WorkspaceExplorerPage slug={slug} />
}
