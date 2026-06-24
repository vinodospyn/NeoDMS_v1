"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  getSettingsSectionPath,
  getSettingsTabPath,
  settingsTabs,
} from "@/config/nav/settings-nav"
import { cn } from "@/lib/utils"
import {
  getActiveSettingsTab,
  isSettingsSectionActive,
} from "@/features/settings/lib/navigation"

const topTabClassName = cn(
  "inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium whitespace-nowrap transition-colors",
  "text-muted-foreground hover:text-foreground",
  "data-[active=true]:border-border/60 data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm"
)

const sectionTabClassName = cn(
  "inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-transparent px-3 text-xs font-medium whitespace-nowrap transition-colors",
  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
  "data-[active=true]:border-border/60 data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm"
)

type SettingsShellProps = {
  children: React.ReactNode
}

export function SettingsShell({ children }: SettingsShellProps) {
  const pathname = usePathname()
  const activeTab = getActiveSettingsTab(pathname)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="sticky top-0 z-10 border-b border-border/70 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
        <div className="mx-auto w-full max-w-[1400px] space-y-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              User preferences and administration
            </p>
          </div>

          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <nav
              aria-label="Settings sections"
              className="flex w-max min-w-full gap-1 rounded-lg bg-muted/50 p-1"
            >
              {settingsTabs.map((tab) => {
                const isActive = activeTab?.slug === tab.slug

                return (
                  <Link
                    key={tab.slug}
                    href={getSettingsTabPath(tab)}
                    data-active={isActive}
                    className={topTabClassName}
                    prefetch
                  >
                    {tab.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {activeTab ? (
            <div className="-mx-1 overflow-x-auto px-1">
              <nav
                aria-label={`${activeTab.label} settings`}
                className="flex w-max min-w-full gap-1.5"
              >
                {activeTab.sections.map((section) => {
                  const href = getSettingsSectionPath(
                    activeTab.slug,
                    section.slug
                  )
                  const isActive = isSettingsSectionActive(
                    pathname,
                    activeTab.slug,
                    section.slug
                  )

                  return (
                    <Link
                      key={section.slug}
                      href={href}
                      data-active={isActive}
                      className={sectionTabClassName}
                      prefetch
                    >
                      {section.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 md:px-6">
        <div className="mx-auto w-full max-w-[1400px]">{children}</div>
      </div>
    </div>
  )
}
