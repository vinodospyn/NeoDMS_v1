import { notFound, redirect } from "next/navigation"

import { getDefaultSettingsPath } from "@/config/nav/settings-nav"
import { SettingsSectionContent } from "@/features/settings/components/settings-section-content"
import { resolveSettingsSegments } from "@/features/settings/lib/navigation"

type SettingsSegmentsPageProps = {
  params: Promise<{ segments?: string[] }>
}

export default async function SettingsSegmentsPage({
  params,
}: SettingsSegmentsPageProps) {
  const { segments } = await params

  if (!segments?.length) {
    redirect(getDefaultSettingsPath())
  }

  const resolved = resolveSettingsSegments(segments)

  if (!resolved) {
    notFound()
  }

  if (resolved.section.kind === "workspace-list") {
    notFound()
  }

  return <SettingsSectionContent section={resolved.section} />
}
