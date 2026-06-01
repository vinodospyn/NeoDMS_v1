# Table Behavior Guide

NeoDMS tables follow the **Ospyn Neo Drive** explorer design: light card shell, muted header row, sky-blue row selection, sortable column headers, and a footer with range text plus pagination (including “Go to page”).

This project uses three table patterns:

1. **Base primitives** — `components/ui/table.tsx` (default styling for all tables)
2. **Drive file explorer** — `features/drive/components/file-explorer-table.tsx` (Owned-by-me list UI)
3. **Dashboard requests** — `features/dashboard/components/neo-table.tsx` (e-sign / request workflow rows)

## Quick Decision Rule

| Need | Use |
|------|-----|
| File/folder lists (DMS explorer) | `FileExplorerTable` or compose base primitives like it |
| Request tracking (badges, signers, stamp blocks) | `NeoTable` + `request-row.tsx` |
| Simple one-off lists | Base `Table` + `TableContainer` |

Do **not** use `neo-table` / `request-row` for drive file lists. Do **not** put drive-specific columns into `components/ui/table.tsx`.

---

## 1) Base Table Primitives

### Source

`components/ui/table.tsx`

### Exports

| Component | Role |
|-----------|------|
| `TableContainer` | Rounded bordered card shell (white background, subtle shadow) |
| `Table` | Scrollable wrapper + `<table>` |
| `TableHeader` | Muted header band (`bg-muted/25`, bottom border) |
| `TableHead` | Column label (`h-11`, `px-4`, muted text) |
| `TableSortHead` | Sortable header with arrow affordance |
| `TableBody` / `TableRow` / `TableCell` | Body rows and cells |
| `TableFooterBar` | Footer row for “Showing X–Y of Z” + pagination |
| `TableFooter` / `TableCaption` | Rare semantic footer / caption |

### Visual tokens (DMS-aligned)

- **Shell:** `TableContainer` — `rounded-xl`, `border`, `bg-background`, `shadow-sm`
- **Header row:** `h-11`, `text-sm font-medium text-muted-foreground`
- **Body cells:** `px-4 py-3`
- **Hover:** `hover:bg-muted/35`
- **Selected row:** `data-state="selected"` → `bg-sky-50/90` (light blue, per design)
- **Checkbox column:** `[&:has([role=checkbox])]` width/padding on head and cell

### Minimal example

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function SimpleList({ rows }: { rows: { id: string; name: string }[] }) {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-muted-foreground">Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
```

### Sortable header

```tsx
<TableSortHead
  sortDirection={sortKey === "name" ? sortDirection : false}
  onSort={() => handleSort("name")}
>
  Name
</TableSortHead>
```

`sortDirection`: `"asc"` | `"desc"` | `false` (inactive).

---

## 2) Drive File Explorer Table

### Purpose

Implements the **Owned by me** file list from the DMS UI: checkbox, name with type icon, category, workspace, created date, file size, star/share/more actions, selection highlight, and footer pagination with **Go to page**.

### Sources

- `features/drive/components/file-explorer-table.tsx`
- `features/drive/components/drive-item-icon.tsx`
- `features/drive/data/mock-files.ts`
- `features/drive/types.ts`

### Route reference

`/sample-sidebar/documents` renders `<FileExplorerPage />` (breadcrumbs, toolbar, and `<FileExplorerTable embedded />`).

### Columns

| Column | Sortable | Notes |
|--------|----------|--------|
| Checkbox | — | Select all on current page |
| Name | Yes | Folder/file icon + label |
| Category | No | Muted text |
| Workspace | No | Muted text |
| Created Date | Yes | Muted text |
| File Size | No | `--` for folders |
| Actions | No | Star (filled when starred), Share, More |

### Selection behavior

- **Row click:** sets `data-state="selected"` (sky highlight) for details-panel wiring later
- **Checkbox:** bulk selection without changing primary selection

### Footer

Uses `TableFooterBar`:

- Left: `Showing 1-10 of {total}`
- Right: Previous / `{page} of {totalPages}` / Next + “Go to page” input + green **Go** button (`primary-button`)

### Usage

```tsx
import { FileExplorerTable } from "@/features/drive/components/file-explorer-table"

export default function OwnedByMePage() {
  return <FileExplorerTable />
}
```

When the API is ready, keep this component and replace `mockDriveItems` with hook-driven data.

---

## 3) Neo Table (Request Workflow)

### Purpose

Rich dashboard table for **request** tracking (not drive files): channel badges, document counts, signer avatars, stamp blocks, status timeline, row action menu, and inset vertical separators between logical columns.

### Sources

- `features/dashboard/components/neo-table.tsx`
- `features/dashboard/components/request-row.tsx`
- `features/dashboard/components/requests-filters.tsx`

### Visual differences from drive table

- Custom `<td>` layout in `request-row.tsx` (not standard `TableCell` children)
- Inset vertical separators via `before:` pseudo-elements on cells
- Filters rendered above the table inside the same `TableContainer`

### Usage

```tsx
import { NeoTable } from "@/features/dashboard/components/neo-table"

export function RequestsDashboardTab() {
  return <NeoTable />
}
```

---

## Extension Guidelines

- Prefer **base primitives** + `TableContainer` for new list pages.
- Add feature-specific tables under `features/<feature>/components/` when columns or row chrome differ materially.
- Use `data-state="selected"` on `TableRow` for explorer selection; do not invent one-off blue backgrounds on rows.
- Reset page index in **event handlers** (search/sort change), not `useEffect` + `setState`.
- If multiple features need the same custom table, extract a shared feature component only after the second real use case.

---

## Maintenance Checklist

**Drive / file list changes**

- `features/drive/types.ts`
- `features/drive/data/mock-files.ts`
- `file-explorer-table.tsx` column mapping

**Request table changes**

- `features/dashboard/types.ts`
- `features/dashboard/data/requests.ts`
- `request-row.tsx`

**Global table look-and-feel**

- `components/ui/table.tsx` (affects all consumers)
- Re-verify `/` (dashboard), `/sample-sidebar/documents` (explorer), `(with-header)` `/dashboard` (neo-table), and `/ui-showcase` table block
