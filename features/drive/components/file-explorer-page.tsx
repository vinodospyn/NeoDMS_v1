"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FileExplorerTable } from "@/features/drive/components/file-explorer-table"
import { FileExplorerToolbar } from "@/features/drive/components/file-explorer-toolbar"

const EXPLORER_CRUMBS = [
  { label: "My Files", href: "#" },
  { label: "On-boarding", href: "#" },
  { label: "Employees", href: "#" },
  { label: "u1210 - Arunkumar" },
] as const

export function FileExplorerPage() {
  const [folderSearch, setFolderSearch] = React.useState("")

  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-6 md:px-8">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/80 bg-background shadow-sm">
        <div className="border-b border-border/70 px-4 py-2.5">
          <Breadcrumb>
            <BreadcrumbList className="gap-1 text-sm">
              {EXPLORER_CRUMBS.map((crumb, index) => {
                const isLast = index === EXPLORER_CRUMBS.length - 1
                return (
                  <React.Fragment key={crumb.label}>
                    {index > 0 ? <BreadcrumbSeparator /> : null}
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="inline-flex items-center gap-1 font-medium">
                          {crumb.label}
                          <ChevronDown className="size-3.5 text-muted-foreground" />
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={"href" in crumb ? crumb.href : "#"}
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <FileExplorerToolbar
          folderSearch={folderSearch}
          onFolderSearchChange={(value) => {
            setFolderSearch(value)
          }}
        />

        <FileExplorerTable folderSearch={folderSearch} embedded />
      </div>
    </div>
  )
}
