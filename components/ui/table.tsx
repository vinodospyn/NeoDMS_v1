"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

function TableContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-shell"
      className={cn(
        "overflow-hidden rounded-xl border border-border/80 bg-background shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "border-b border-border/70 bg-muted/25 [&_tr]:border-0",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/25 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border/60 transition-colors",
        "hover:bg-muted/35",
        "has-aria-expanded:bg-muted/35",
        "data-[state=selected]:bg-sky-50/90 data-[state=selected]:hover:bg-sky-50",
        "dark:data-[state=selected]:bg-sky-950/35 dark:data-[state=selected]:hover:bg-sky-950/40",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-4 text-left align-middle text-sm font-medium whitespace-nowrap text-muted-foreground",
        "[&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:px-3 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

type TableSortHeadProps = React.ComponentProps<"th"> & {
  sortDirection?: "asc" | "desc" | false
  onSort?: () => void
}

function TableSortHead({
  className,
  children,
  sortDirection = false,
  onSort,
  ...props
}: TableSortHeadProps) {
  const SortIcon =
    sortDirection === "asc"
      ? ArrowUp
      : sortDirection === "desc"
        ? ArrowDown
        : ArrowUpDown

  return (
    <TableHead
      className={className}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : "none"
      }
      {...props}
    >
      <button
        type="button"
        onClick={onSort}
        className="inline-flex items-center gap-1.5 rounded-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {children}
        <SortIcon
          className={cn(
            "size-3.5 shrink-0",
            sortDirection ? "text-foreground opacity-90" : "opacity-50"
          )}
          aria-hidden
        />
      </button>
    </TableHead>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3 align-middle whitespace-nowrap text-sm text-foreground",
        "[&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:px-3 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function TableFooterBar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-footer-bar"
      className={cn(
        "flex flex-col gap-3 border-t border-border/70 bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableFooterBar,
  TableHead,
  TableHeader,
  TableRow,
  TableSortHead,
}
