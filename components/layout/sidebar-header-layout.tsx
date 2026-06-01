import * as React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type SidebarHeaderLayoutProps = {
  sidebar: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  contentClassName?: string
  /** Applies Neo Drive design tokens (sidebar + main surface). */
  driveShell?: boolean
}

export function SidebarHeaderLayout({
  sidebar,
  header,
  children,
  defaultOpen = false,
  contentClassName,
  driveShell = false,
}: SidebarHeaderLayoutProps) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className={driveShell ? "drive-shell" : undefined}
    >
      {sidebar}
      <SidebarInset className="h-svh overflow-hidden">
        {header}
        <main
          className={
            contentClassName ??
            (driveShell
              ? "drive-main flex-1 overflow-y-auto"
              : "flex-1 overflow-y-auto")
          }
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
