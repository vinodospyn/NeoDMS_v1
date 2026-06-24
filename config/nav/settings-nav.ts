export type SettingsSectionKind = "placeholder" | "theme" | "workspace-list"

export type SettingsSection = {
  label: string
  slug: string
  kind?: SettingsSectionKind
}

export type SettingsTab = {
  label: string
  slug: string
  sections: SettingsSection[]
}

/** Settings information architecture — tabs and sections. */
export const settingsTabs: SettingsTab[] = [
  {
    label: "Profile",
    slug: "profile",
    sections: [
      { label: "User Profile", slug: "user-profile" },
      { label: "Contact Information", slug: "contact-information" },
      { label: "Profile Photo", slug: "profile-photo" },
    ],
  },
  {
    label: "Preferences",
    slug: "preferences",
    sections: [
      { label: "Theme", slug: "theme", kind: "theme" },
      { label: "Language", slug: "language" },
      { label: "Date & Time Format", slug: "date-time-format" },
      { label: "Notification Preferences", slug: "notification-preferences" },
    ],
  },
  {
    label: "Workspace Management",
    slug: "workspace-management",
    sections: [
      { label: "Create Workspace", slug: "workspaces", kind: "workspace-list" },
      { label: "Workspace Templates", slug: "templates" },
      { label: "Default Workspace Settings", slug: "default-settings" },
      { label: "Workspace Categories", slug: "categories" },
    ],
  },
  {
    label: "Users & Roles",
    slug: "users-roles",
    sections: [
      { label: "User Management", slug: "user-management" },
      { label: "Roles", slug: "roles" },
      { label: "Permission Matrix", slug: "permission-matrix" },
      { label: "Access Policies", slug: "access-policies" },
    ],
  },
  {
    label: "Security",
    slug: "security",
    sections: [
      { label: "Password Settings", slug: "password-settings" },
      { label: "MFA Configuration", slug: "mfa-configuration" },
      { label: "Session Management", slug: "session-management" },
      { label: "Login History", slug: "login-history" },
    ],
  },
  {
    label: "Notifications",
    slug: "notifications",
    sections: [
      { label: "Email Notifications", slug: "email-notifications" },
      { label: "In-App Notifications", slug: "in-app-notifications" },
      { label: "Alert Preferences", slug: "alert-preferences" },
    ],
  },
  {
    label: "Storage & Retention",
    slug: "storage-retention",
    sections: [
      { label: "Storage Usage", slug: "storage-usage" },
      { label: "Retention Policies", slug: "retention-policies" },
      { label: "Archive Settings", slug: "archive-settings" },
    ],
  },
  {
    label: "Audit Logs",
    slug: "audit-logs",
    sections: [
      { label: "User Activity", slug: "user-activity" },
      { label: "Workspace Activity", slug: "workspace-activity" },
      { label: "System Logs", slug: "system-logs" },
    ],
  },
  {
    label: "Integrations",
    slug: "integrations",
    sections: [
      { label: "LDAP / Active Directory", slug: "ldap-active-directory" },
      { label: "SSO", slug: "sso" },
      { label: "External Storage", slug: "external-storage" },
      { label: "API Keys", slug: "api-keys" },
    ],
  },
]

export const settingsBasePath = "/settings"

export function getSettingsSectionPath(tabSlug: string, sectionSlug: string) {
  return `${settingsBasePath}/${tabSlug}/${sectionSlug}`
}

export function getDefaultSettingsPath() {
  const firstTab = settingsTabs[0]
  const firstSection = firstTab.sections[0]
  return getSettingsSectionPath(firstTab.slug, firstSection.slug)
}

export function getSettingsTabPath(tab: SettingsTab) {
  return getSettingsSectionPath(tab.slug, tab.sections[0].slug)
}
