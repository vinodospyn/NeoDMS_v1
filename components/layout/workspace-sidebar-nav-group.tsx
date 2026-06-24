"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { workspacesSidebarNavItem } from "@/config/nav/sidebar-nav"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { isNavGroupActive, isNavItemActive } from "@/lib/navigation"
import { useWorkspaceNavItems } from "@/features/workspace/hooks/use-workspace-nav"

const menuButtonClassName = cn(
  "h-10 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/90",
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-none"
)

type WorkspaceSidebarNavGroupProps = {
  pathname: string
  router: ReturnType<typeof useRouter>
}

export function WorkspaceSidebarNavGroup({
  pathname,
  router,
}: WorkspaceSidebarNavGroupProps) {
  const { items } = useWorkspaceNavItems()
  const navItem = React.useMemo(
    () => ({ ...workspacesSidebarNavItem, children: items }),
    [items]
  )
  const isGroupActive = isNavGroupActive(pathname, navItem)
  const [userOpen, setUserOpen] = React.useState<boolean | undefined>(undefined)
  const open = userOpen ?? isGroupActive

  return (
    <Collapsible open={open} onOpenChange={setUserOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={isGroupActive}
            tooltip={navItem.label}
            className={menuButtonClassName}
          >
            {navItem.icon ? (
              <navItem.icon className="size-[18px] opacity-90" />
            ) : null}
            <span>{navItem.label}</span>
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
            {items.map((child) => (
              <SidebarMenuSubItem key={child.href}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isNavItemActive(pathname, child.href, {
                    matchDescendants: child.matchDescendants,
                  })}
                >
                  <Link
                    href={child.href}
                    prefetch
                    onMouseEnter={() => router.prefetch(child.href)}
                    onFocus={() => router.prefetch(child.href)}
                  >
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
