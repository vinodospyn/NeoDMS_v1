import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"

type MinimalLayoutProps = {
  children: React.ReactNode
  contentClassName?: string
}

export function MinimalLayout({ children, contentClassName }: MinimalLayoutProps) {
  return <AppShell contentClassName={contentClassName ?? "flex-1"}>{children}</AppShell>
}
