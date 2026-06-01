import * as React from "react"

type AppShellProps = {
  header?: React.ReactNode
  children: React.ReactNode
  contentClassName?: string
}

export function AppShell({ header, children, contentClassName }: AppShellProps) {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background">
      {header}
      <main className={contentClassName ?? "flex-1 overflow-y-auto"}>{children}</main>
    </div>
  )
}
