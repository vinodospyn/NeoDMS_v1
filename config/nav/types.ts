import type { LucideIcon } from "lucide-react"

export type NavSubItem = {
  label: string
  href: string
  icon?: LucideIcon
}

export type NavItem = {
  label: string
  href: string
  icon?: LucideIcon
  children?: NavSubItem[]
}
