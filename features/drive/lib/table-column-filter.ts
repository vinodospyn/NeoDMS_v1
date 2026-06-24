import type { DriveItem } from "@/features/drive/types"
import type { DriveListColumn } from "@/features/drive/types/drive-list"

export const ALL_FILTER_VALUE = "all"

export type ColumnFilterState = Record<string, string>

export type ColumnFilterSection = {
  columnId: string
  label: string
  options: Array<{ value: string; label: string }>
}

export type FilterableColumn<T> = {
  id: string
  label: string
  filterable?: boolean
  getFilterValue?: (item: T) => string
  getSortValue?: (item: T) => string
}

export function getFilterableColumnIds<T>(
  columns: Array<Pick<FilterableColumn<T>, "id" | "filterable">>
) {
  return columns.filter((column) => column.filterable).map((column) => column.id)
}

export function createEmptyColumnFilters(columnIds: string[]): ColumnFilterState {
  return Object.fromEntries(
    columnIds.map((columnId) => [columnId, ALL_FILTER_VALUE])
  )
}

export function hasActiveColumnFilters(filters: ColumnFilterState) {
  return Object.values(filters).some((value) => value !== ALL_FILTER_VALUE)
}

export function buildColumnFilterSections<T>(
  items: T[],
  columns: FilterableColumn<T>[]
): ColumnFilterSection[] {
  return columns
    .filter((column) => column.filterable)
    .map((column) => {
      const getValue = column.getFilterValue ?? column.getSortValue
      if (!getValue) {
        return null
      }

      const values = [...new Set(items.map((item) => getValue(item)))].sort(
        (left, right) => left.localeCompare(right)
      )

      return {
        columnId: column.id,
        label: column.label,
        options: [
          { value: ALL_FILTER_VALUE, label: `All ${column.label}` },
          ...values.map((value) => ({ value, label: value })),
        ],
      }
    })
    .filter((section): section is ColumnFilterSection => section != null)
}

export function matchesColumnFilters<T>(
  item: T,
  columns: FilterableColumn<T>[],
  filters: ColumnFilterState
) {
  return columns.every((column) => {
    if (!column.filterable) {
      return true
    }

    const filterValue = filters[column.id] ?? ALL_FILTER_VALUE
    if (filterValue === ALL_FILTER_VALUE) {
      return true
    }

    const getValue = column.getFilterValue ?? column.getSortValue
    if (!getValue) {
      return true
    }

    return getValue(item) === filterValue
  })
}

export function filterItemsByColumns<T>(
  items: T[],
  columns: FilterableColumn<T>[],
  filters: ColumnFilterState
) {
  if (!hasActiveColumnFilters(filters)) {
    return items
  }

  return items.filter((item) => matchesColumnFilters(item, columns, filters))
}

export function getColumnSearchValues<T extends DriveItem>(
  item: T,
  columns: DriveListColumn<T>[]
) {
  const values = new Set<string>()

  for (const column of columns) {
    const getValue = column.getFilterValue ?? column.getSortValue
    if (getValue) {
      values.add(getValue(item))
    }
  }

  return [...values]
}
