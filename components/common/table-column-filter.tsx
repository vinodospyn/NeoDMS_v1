"use client"

import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ALL_FILTER_VALUE,
  type ColumnFilterSection,
  type ColumnFilterState,
  hasActiveColumnFilters,
} from "@/features/drive/lib/table-column-filter"
import { cn } from "@/lib/utils"

type TableColumnFilterProps = {
  sections: ColumnFilterSection[]
  filters: ColumnFilterState
  onFiltersChange: (filters: ColumnFilterState) => void
  className?: string
}

export function TableColumnFilter({
  sections,
  filters,
  onFiltersChange,
  className,
}: TableColumnFilterProps) {
  const isActive = hasActiveColumnFilters(filters)

  function handleFilterChange(columnId: string, value: string) {
    onFiltersChange({
      ...filters,
      [columnId]: value,
    })
  }

  function handleClearAll() {
    onFiltersChange(
      Object.fromEntries(
        sections.map((section) => [section.columnId, ALL_FILTER_VALUE])
      )
    )
  }

  if (sections.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            "size-8 text-muted-foreground hover:text-foreground",
            isActive && "bg-primary/10 text-primary",
            className
          )}
          aria-label="Filter table columns"
        >
          <SlidersHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 w-60 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={section.columnId}>
            <DropdownMenuLabel>{section.label}</DropdownMenuLabel>
            {section.options.map((option) => (
              <DropdownMenuCheckboxItem
                key={`${section.columnId}-${option.value}`}
                checked={filters[section.columnId] === option.value}
                onCheckedChange={() =>
                  handleFilterChange(section.columnId, option.value)
                }
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
            {index < sections.length - 1 ? <DropdownMenuSeparator /> : null}
          </div>
        ))}
        {isActive ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClearAll}>
              Clear filters
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
