"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { appConfig } from "@/config/app"
import { getSidebarNavItems } from "@/config/nav/resolver"
import { sidebarSettingsNavItem } from "@/config/nav/sidebar-nav"
import type { NavItem } from "@/config/nav/types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { isNavGroupActive, isNavItemActive } from "@/lib/navigation"
import { DriveNewMenu } from "@/features/drive/components/drive-new-menu"

const storagePercent =
  (appConfig.storageUsedGb / appConfig.storageTotalGb) * 100

const menuButtonClassName = cn(
  "h-10 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/90",
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-none"
)

function SidebarNavLink({
  item,
  pathname,
  router,
}: {
  item: NavItem
  pathname: string
  router: ReturnType<typeof useRouter>
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isNavItemActive(pathname, item.href)}
        tooltip={item.label}
        className={menuButtonClassName}
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
  )
}

function SidebarNavGroup({
  item,
  pathname,
  router,
}: {
  item: NavItem
  pathname: string
  router: ReturnType<typeof useRouter>
}) {
  const isGroupActive = isNavGroupActive(pathname, item)
  const [open, setOpen] = React.useState(isGroupActive)

  React.useEffect(() => {
    if (isGroupActive) setOpen(true)
  }, [isGroupActive])

  if (!item.children?.length) {
    return <SidebarNavLink item={item} pathname={pathname} router={router} />
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={isGroupActive}
            tooltip={item.label}
            className={menuButtonClassName}
          >
            {item.icon ? (
              <item.icon className="size-[18px] opacity-90" />
            ) : null}
            <span>{item.label}</span>
            <ChevronDown
              className={cn(
                "ml-auto size-4 opacity-70 transition-transform",
                open && "rotate-180"
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child) => (
              <SidebarMenuSubItem key={child.href}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isNavItemActive(pathname, child.href)}
                >
                  <Link
                    href={child.href}
                    prefetch
                    onMouseEnter={() => router.prefetch(child.href)}
                    onFocus={() => router.prefetch(child.href)}
                  >
                    {child.icon ? (
                      <child.icon className="size-4 opacity-90" />
                    ) : null}
                    <span>{child.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = getSidebarNavItems()

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 [--sidebar-width-icon:3.25rem]"
      {...props}
    >
      <SidebarHeader className="gap-0 p-0">
        <div className="flex items-center gap-2.5 px-3 pt-4 pb-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            O
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-xs leading-none text-sidebar-foreground/60">
              {appConfig.productName}
            </p>
            <p className="mt-0.5 truncate text-base leading-tight font-semibold text-sidebar-foreground">
              {appConfig.driveName}
            </p>
          </div>
        </div>

        <SidebarSeparator className="mx-0 w-full" />
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-hidden px-3 py-0 group-data-[collapsible=icon]:px-2">
        <div className="pt-4 pb-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <DriveNewMenu />
        </div>

        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => (
                <SidebarNavGroup
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  router={router}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-0 p-0">
        <SidebarSeparator className="mx-0 w-full" />
        <div className="flex flex-col gap-3 px-3 py-4 group-data-[collapsible=icon]:px-2">
          <SidebarMenu className="gap-0.5">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isNavItemActive(pathname, sidebarSettingsNavItem.href)}
                tooltip={sidebarSettingsNavItem.label}
                className={menuButtonClassName}
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

          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-3 group-data-[collapsible=icon]:hidden">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-sidebar-foreground/70">
                Storage
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                {appConfig.storageUsedGb} GB of {appConfig.storageTotalGb} GB
              </p>
            </div>
            <Progress
              value={storagePercent}
              className="mb-2 h-1.5 bg-sidebar-border **:data-[slot=progress-indicator]:bg-primary"
            />
            <button
              type="button"
              className="drive-link text-xs font-medium hover:underline"
            >
              Upgrade Storage
            </button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
