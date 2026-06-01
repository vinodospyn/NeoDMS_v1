"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Gem } from "lucide-react"

import { appConfig } from "@/config/app"
import { getSidebarNavItems } from "@/config/nav/resolver"
import { sidebarSettingsNavItem } from "@/config/nav/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { isNavItemActive } from "@/lib/navigation"

const storagePercent =
  (appConfig.storageUsedGb / appConfig.storageTotalGb) * 100

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = getSidebarNavItems()

  return (
    <Sidebar
      collapsible="icon"
      className="[--sidebar-width-icon:3.75rem] border-r-0"
      {...props}
    >
      <SidebarHeader className="gap-3 px-3 py-4">
        <div className="flex items-start gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#008542] text-sm font-bold text-white">
            O
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-xs leading-none text-sidebar-foreground/60">
              {appConfig.productName}
            </p>
            <p className="mt-0.5 truncate text-base font-semibold leading-tight text-sidebar-foreground">
              {appConfig.driveName}
            </p>
          </div>
        </div>

        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="mb-1.5 px-0 text-[10px] font-semibold tracking-wider text-sidebar-foreground/45 uppercase">
            Workspace
          </SidebarGroupLabel>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full justify-start gap-2 rounded-xl border-sidebar-border/80 bg-white/5 px-3 text-sm font-medium text-sidebar-foreground hover:bg-white/10 hover:text-sidebar-foreground"
          >
            <Gem className="size-4 shrink-0 text-[#4ade80]" aria-hidden />
            <span className="truncate">{appConfig.workspaceName}</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isNavItemActive(pathname, item.href)}
                    tooltip={item.label}
                    className={cn(
                      "h-10 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/85",
                      "hover:bg-white/8 hover:text-sidebar-foreground",
                      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-none"
                    )}
                  >
                    <Link
                      href={item.href}
                      prefetch
                      onMouseEnter={() => router.prefetch(item.href)}
                      onFocus={() => router.prefetch(item.href)}
                    >
                      {item.icon ? (
                        <item.icon className="size-[18px] opacity-90" />
                      ) : null}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 px-3 pb-4">
        <Separator className="bg-sidebar-border" />
        <SidebarMenu className="gap-0.5">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isNavItemActive(
                pathname,
                sidebarSettingsNavItem.href
              )}
              tooltip={sidebarSettingsNavItem.label}
              className={cn(
                "h-10 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/85",
                "hover:bg-white/8 hover:text-sidebar-foreground",
                "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
              )}
            >
              <Link href={sidebarSettingsNavItem.href} prefetch>
                {sidebarSettingsNavItem.icon ? (
                  <sidebarSettingsNavItem.icon className="size-[18px]" />
                ) : null}
                <span>{sidebarSettingsNavItem.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="rounded-xl border border-sidebar-border/80 bg-white/5 p-3 group-data-[collapsible=icon]:hidden">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-sidebar-foreground/70">
              Storage
            </p>
            <p className="text-xs text-sidebar-foreground/55">
              {appConfig.storageUsedGb} GB of {appConfig.storageTotalGb} GB
            </p>
          </div>
          <Progress
            value={storagePercent}
            className="mb-2 h-1.5 bg-white/15 **:data-[slot=progress-indicator]:bg-[#22c55e]"
          />
          <button
            type="button"
            className="drive-link text-xs font-medium hover:underline"
          >
            Upgrade Storage
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
