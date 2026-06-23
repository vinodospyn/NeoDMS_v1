"use client"

import * as React from "react"
import {
  ChevronDown,
  FolderPlus,
  Home,
  Info,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const PATH_CRUMBS = [
  { label: "On-boarding", href: "#" },
  { label: "Employees", href: "#" },
] as const

const crumbLinkClass =
  "text-[13px] font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"

type FileExplorerBreadcrumbProps = {
  activeFolderLabel: string
  onNewFolder?: () => void
  onRename?: () => void
  onShare?: () => void
  onMoveToTrash?: () => void
  onFileInfo?: () => void
  className?: string
}

export function FileExplorerBreadcrumb({
  activeFolderLabel,
  onNewFolder,
  onRename,
  onShare,
  onMoveToTrash,
  onFileInfo,
  className,
}: FileExplorerBreadcrumbProps) {
  return (
    <Breadcrumb className={cn("min-w-0 flex-1 overflow-hidden", className)}>
      <BreadcrumbList className="flex-nowrap gap-1.5 overflow-hidden">
        <BreadcrumbItem className="shrink-0">
          <BreadcrumbLink
            href="#"
            className={cn(crumbLinkClass, "inline-flex items-center gap-1.5")}
          >
            <Home className="size-3.5 shrink-0 opacity-80" aria-hidden />
            <span>Personal Space</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {PATH_CRUMBS.map((crumb) => (
          <React.Fragment key={crumb.label}>
            <BreadcrumbSeparator className="shrink-0 text-slate-300 dark:text-slate-600" />
            <BreadcrumbItem className="hidden shrink-0 sm:inline-flex">
              <BreadcrumbLink href={crumb.href} className={crumbLinkClass}>
                {crumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}

        <BreadcrumbSeparator className="shrink-0 text-slate-300 dark:text-slate-600" />
        <BreadcrumbItem className="min-w-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex max-w-full items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[13px] font-semibold text-slate-900 transition-colors hover:bg-slate-200/90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                aria-label={`Folder actions for ${activeFolderLabel}`}
              >
                <span className="truncate">{activeFolderLabel}</span>
                <ChevronDown
                  className="size-3.5 shrink-0 text-slate-500 dark:text-slate-400"
                  aria-hidden
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[11rem] p-1.5">
              <DropdownMenuItem
                className="gap-2.5 px-3 py-2"
                onSelect={onNewFolder}
              >
                <FolderPlus className="size-4 text-muted-foreground" />
                New Folder
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2.5 px-3 py-2"
                onSelect={onRename}
              >
                <Pencil className="size-4 text-muted-foreground" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2.5 px-3 py-2"
                onSelect={onShare}
              >
                <Share2 className="size-4 text-muted-foreground" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2.5 px-3 py-2"
                variant="destructive"
                onSelect={onMoveToTrash}
              >
                <Trash2 className="size-4" />
                Move to trash
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2.5 px-3 py-2"
                onSelect={onFileInfo}
              >
                <Info className="size-4 text-muted-foreground" />
                File Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
