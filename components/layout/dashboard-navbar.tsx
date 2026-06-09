"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Cog, Menu, User } from "lucide-react"

import { ThemeManager } from "@/components/theme-manager"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { appConfig } from "@/config/app"
import { getHeaderNavItems } from "@/config/nav/resolver"
import { isNavItemActive } from "@/lib/navigation"

type DashboardNavbarProps = {
  showSidebarTrigger?: boolean
}

export function DashboardNavbar({
  showSidebarTrigger = true,
}: DashboardNavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = getHeaderNavItems()

  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-6">
      {showSidebarTrigger ? <SidebarTrigger className="mr-3" /> : null}

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="mr-2 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 sm:max-w-72">
          <SheetHeader className="border-b">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col p-2">
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  prefetch
                  onMouseEnter={() => router.prefetch(item.href)}
                  onFocus={() => router.prefetch(item.href)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isNavItemActive(pathname, item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-48">
        <p className="text-base font-semibold tracking-tight">
          {appConfig.productName}
        </p>
      </div>

      <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium text-muted-foreground md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            onMouseEnter={() => router.prefetch(item.href)}
            onFocus={() => router.prefetch(item.href)}
            className={`cursor-pointer px-3 py-4 transition-colors hover:text-foreground ${
              isNavItemActive(pathname, item.href)
                ? "border-b-2 border-foreground text-foreground"
                : "border-b-2 border-transparent"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1">
        <Button size="lg" className="primary-button mr-1 rounded-full">
          {appConfig.primaryCtaLabel}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
        >
          <Bell className="size-4" />
        </Button>
        <ThemeManager
          trigger={
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            >
              <Cog className="size-4" />
            </Button>
          }
        />
        <Button variant="outline" size="icon-sm" className="ml-1">
          <User className="size-4" />
        </Button>
      </div>
    </header>
  )
}
