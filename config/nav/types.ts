import type { LucideIcon } from "lucide-react"

export type NavSubItem = {
  label: string
  href: string
  icon?: LucideIcon
  matchDescendants?: boolean
}

export type NavItem = {
  label: string
  href: string
  icon?: LucideIcon
  children?: NavSubItem[]
  matchDescendants?: boolean
  /** When true, parent only expands/collapses — it does not navigate. */
  expandOnly?: boolean
}
