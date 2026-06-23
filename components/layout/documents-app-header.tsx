"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, Palette, Search, Sparkles, X } from "lucide-react"

import { ThemeManager } from "@/components/theme-manager"
import { appConfig } from "@/config/app"
import { getSidebarNavItems } from "@/config/nav/resolver"
import {
  flattenSidebarNavItems,
  sidebarSettingsNavItem,
} from "@/config/nav/sidebar-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { isNavItemActive } from "@/lib/navigation"

const ROUTE_TITLES: Record<string, string> = {
  "/": "Home",
  "/personal-space": "Personal Space",
  "/workspaces/finance": "Finance",
  "/workspaces/human-resource": "Human Resource",
  "/workspaces/marketing": "Marketing",
  "/shared-with-me": "Shared with me",
  "/shared-by-me": "Shared by me",
  "/favorites": "Favorites",
  "/recent": "Recent",
  "/trash": "Trash",
  "/settings": "Settings",
}

function getPageTitle(pathname: string): string {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname]
  const navItems = [
    ...flattenSidebarNavItems(getSidebarNavItems()),
    sidebarSettingsNavItem,
  ]
  const active = navItems.find((item) => isNavItemActive(pathname, item.href))
  return active?.label ?? "Home"
}

function DriveSearchBar({ className }: { className?: string }) {
  const [query, setQuery] = React.useState("")

  return (
    <div className={className}>
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 border-border/70 text-primary opacity-50"
        aria-hidden
      />
      <Input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search in Neo Drive"
        className="drive-search-input h-11 rounded-full border border-border/70 pr-20 pl-10 text-sm text-primary shadow-none placeholder:text-primary/50"
      />
      {query ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-1/2 right-1.5 h-7 -translate-y-1/2 rounded-full px-2.5 text-xs text-muted-foreground"
          onClick={() => setQuery("")}
        >
          <X className="mr-1 size-3" />
          Clear
        </Button>
      ) : null}
    </div>
  )
}

export function DocumentsAppHeader() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)
  const initials = appConfig.userDisplayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="border-b border-border/70 bg-background">
      <div className="mx-auto flex w-full flex-col gap-1 px-4">
        <div className="flex h-14 items-center gap-1 md:hidden">
          <SidebarTrigger className="shrink-0" />
          <p className="min-w-0 truncate text-sm font-medium text-foreground">
            {pageTitle}
          </p>
          <div className="ml-auto flex items-center gap-1">
            <HeaderActions initials={initials} compact />
          </div>
        </div>
        <div className="relative w-full pb-3 md:hidden">
          <DriveSearchBar className="relative w-full" />
        </div>

        <div className="hidden h-16 grid-cols-[minmax(0,1fr)_minmax(240px,1fr)_auto] items-center gap-4 lg:grid xl:grid-cols-[220px_minmax(320px,1fr)_auto]">
          <div className="flex min-w-0 items-center gap-1">
            <SidebarTrigger className="shrink-0" />
            <p className="truncate text-sm font-medium text-foreground">
              {pageTitle}
            </p>
          </div>
          <DriveSearchBar className="relative w-full max-w-lg justify-self-center" />
          <HeaderActions initials={initials} />
        </div>
      </div>
    </header>
  )
}

function HeaderActions({
  initials,
  compact = false,
}: {
  initials: string
  compact?: boolean
}) {
  return (
    <div className="flex items-center justify-end gap-0.5 sm:gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground"
        aria-label="AI assistant"
      >
        <Sparkles className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="relative text-muted-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-rose-500" />
      </Button>
      <ThemeManager
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
            aria-label="Theme settings"
          >
            <Palette className="size-4" />
          </Button>
        }
      />
      <button
        type="button"
        className="ml-1 flex items-center gap-2 rounded-full border border-transparent p-1 text-left transition-colors hover:bg-muted/50 lg:pl-1"
        aria-label="Account menu"
      >
        <Avatar size="sm">
          <AvatarImage src="" alt={appConfig.userDisplayName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {!compact ? (
          <>
            <div className="hidden text-xs leading-tight xl:block">
              <p className="font-medium text-foreground">
                {appConfig.userDisplayName}
              </p>
              <p className="text-muted-foreground">{appConfig.userEmail}</p>
            </div>
            <ChevronDown className="hidden size-3.5 text-muted-foreground xl:block" />
          </>
        ) : null}
      </button>
    </div>
  )
}
