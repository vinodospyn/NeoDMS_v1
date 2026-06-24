import {
  getSettingsSectionPath,
  settingsBasePath,
  settingsTabs,
  type SettingsSection,
  type SettingsTab,
} from "@/config/nav/settings-nav"

export function isSettingsPath(pathname: string) {
  return pathname === settingsBasePath || pathname.startsWith(`${settingsBasePath}/`)
}

export function resolveSettingsSegments(
  segments: string[] | undefined
): { tab: SettingsTab; section: SettingsSection } | null {
  if (!segments?.length) return null

  const [tabSlug, sectionSlug] = segments
  const tab = settingsTabs.find((item) => item.slug === tabSlug)
  if (!tab) return null

  const section = tab.sections.find((item) => item.slug === sectionSlug)
  if (!section) return null

  return { tab, section }
}

export function getActiveSettingsTab(pathname: string): SettingsTab | null {
  if (!isSettingsPath(pathname)) return null

  const segments = pathname
    .slice(settingsBasePath.length)
    .split("/")
    .filter(Boolean)

  const tabSlug = segments[0]
  return settingsTabs.find((tab) => tab.slug === tabSlug) ?? null
}

export function isSettingsSectionActive(
  pathname: string,
  tabSlug: string,
  sectionSlug: string
) {
  const href = getSettingsSectionPath(tabSlug, sectionSlug)
  if (sectionSlug === "workspaces" && tabSlug === "workspace-management") {
    return pathname === href || pathname.startsWith(`${href}/`)
  }
  return pathname === href
}

export function getSettingsPageTitle(pathname: string): string | null {
  if (!isSettingsPath(pathname)) return null

  if (
    pathname.startsWith("/settings/workspace-management/workspaces/") &&
    pathname.endsWith("/edit")
  ) {
    return "Edit Workspace"
  }

  if (pathname === "/settings/workspace-management/workspaces/new") {
    return "Create Workspace"
  }

  const segments = pathname
    .slice(settingsBasePath.length)
    .split("/")
    .filter(Boolean)

  const resolved = resolveSettingsSegments(segments)
  return resolved?.section.label ?? "Settings"
}
