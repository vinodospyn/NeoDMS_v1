import type { SettingsSection } from "@/config/nav/settings-nav"
import { SettingsPlaceholderSection } from "@/features/settings/components/settings-placeholder-section"
import { SettingsThemeSection } from "@/features/settings/components/settings-theme-section"

type SettingsSectionContentProps = {
  section: SettingsSection
}

export function SettingsSectionContent({ section }: SettingsSectionContentProps) {
  if (section.kind === "theme") {
    return <SettingsThemeSection />
  }

  return <SettingsPlaceholderSection title={section.label} />
}
