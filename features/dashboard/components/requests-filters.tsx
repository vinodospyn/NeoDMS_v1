"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const REQUEST_SORT_OPTIONS = ["newest", "oldest", "amount-desc", "amount-asc"] as const
export type RequestSort = (typeof REQUEST_SORT_OPTIONS)[number]
const requestSortOptionSet = new Set<RequestSort>(REQUEST_SORT_OPTIONS)

export function isRequestSort(value: string): value is RequestSort {
  return requestSortOptionSet.has(value as RequestSort)
}

type RequestsFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  sort: RequestSort
  onSortChange: (value: RequestSort) => void
}

export function RequestsFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: RequestsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={sort}
          onValueChange={(value) => {
            if (isRequestSort(value)) {
              onSortChange(value)
            }
          }}
        >
          <SelectTrigger size="default" className="min-w-[130px] justify-between">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="amount-desc">Amount (high to low)</SelectItem>
            <SelectItem value="amount-asc">Amount (low to high)</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked>In Progress</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Completed</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Channel</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked>FTP</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>API</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Web</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
