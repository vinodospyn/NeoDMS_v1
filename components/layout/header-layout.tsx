import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"

type HeaderLayoutProps = {
  header: React.ReactNode
  children: React.ReactNode
  contentClassName?: string
}

export function HeaderLayout({ header, children, contentClassName }: HeaderLayoutProps) {
  return (
    <AppShell header={header} contentClassName={contentClassName}>
      {children}
    </AppShell>
  )
}
