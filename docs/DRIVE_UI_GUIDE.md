# Neo Drive UI Guide

Design reference for the **Ospyn Neo My Drive** shell implemented in `(with-sidebar)`. Use with `docs/TYPOGRAPHY_GUIDE.md` and `docs/TABLE_BEHAVIOR_GUIDE.md`.

## Scope

| In scope | Out of scope (template demos) |
|----------|-------------------------------|
| `/` dashboard | `(with-header)` `/dashboard` requests table |
| `/sample-sidebar/documents` explorer | `/learn-minimal` unless linked from marketing |
| Sidebar + `DocumentsAppHeader` | `/ui-showcase` |

Drive styling is scoped via `.drive-shell` on `SidebarProvider` (`app/(with-sidebar)/layout.tsx`).

## Color & Surface

| Element | Token / class |
|---------|----------------|
| Main background | `--drive-surface` `#f9fafb` · `.drive-main` |
| Quick access cards | `--drive-quick-access` `#f2f4f7` · `.drive-quick-access-card` |
| Primary links | `--drive-link` `#008542` · `.drive-link` |
| Search field | `--drive-search-bg` `#eef4fb` · `.drive-search-input` |
| Sidebar background | `#0b121e` (sidebar CSS variables under `.drive-shell`) |
| Active nav item | Dark green fill + bright green text/icon |

## Spacing

- Page horizontal padding: `px-6 md:px-8` (aligns with header)
- Section gap below greeting: `mb-8` / `mb-10`
- Quick access grid: `gap-4` / `xl:gap-5` (≈20px at xl)
- Quick access card: `h-[60px]`, `rounded-[10px]`, `px-3 py-2.5`
- Explorer panel: single `rounded-xl` card — breadcrumbs, toolbar, table share one shell

## Typography

| Element | Classes |
|---------|---------|
| Greeting | `text-2xl font-semibold tracking-tight` |
| Greeting subtitle | `text-sm text-muted-foreground` |
| Section title (“Quick access”) | `text-base font-semibold` |
| Card title | `text-sm font-semibold` |
| Card subtitle | `text-xs` muted grey |
| Sidebar nav | `text-sm font-medium` |

## Component Map

| UI area | Source |
|---------|--------|
| Sidebar | `components/layout/app-sidebar.tsx` |
| Header | `components/layout/documents-app-header.tsx` |
| Dashboard | `features/drive/components/drive-dashboard-page.tsx` |
| Quick access | `quick-access-section.tsx`, `quick-access-card.tsx`, `quick-access-item-icon.tsx` |
| Recent files | `recent-file-card.tsx` |
| File explorer | `file-explorer-page.tsx`, `file-explorer-toolbar.tsx`, `file-explorer-table.tsx` |
| Branding config | `config/app.ts` |
| Nav IA | `config/nav/sidebar-nav.ts` |

## Dashboard — Quick Access

- **10 items**, 5 columns × 2 rows at `xl`
- **Folders:** blue folder icon with white star centered
- **Files:** Word (`W` on `#2b579a`), PDF (red `PDF` badge)
- **View more** → `/sample-sidebar/quick-access`

Mock data: `features/drive/data/mock-dashboard.ts` → `quickAccessItems`.

## Dashboard — Recent Files

- White card, light border, preview area, optional tag (HR / Finance)
- Footer: clock icon + “Opened …” timestamp
- Mock data: `recentFileItems` in same file

## File Explorer — Owned by Me

Route: `/sample-sidebar/documents`

1. Breadcrumb trail (e.g. My Files › On-boarding › …)
2. Toolbar: “Search in selected folder”, view/sort/filter icons, green **+ New**
3. Table with selection + footer pagination (“Go to page”)

## Configuration

Update display copy in `config/app.ts`:

```ts
productName, driveName, userDisplayName, userEmail,
workspaceName, storageUsedGb, storageTotalGb
```

## Adding a New Drive Screen

1. Add route under `app/(with-sidebar)/…`
2. Add `NavItem` in `config/nav/sidebar-nav.ts`
3. Add title in `ROUTE_TITLES` inside `documents-app-header.tsx`
4. Implement UI in `features/drive/components/`
5. Reuse `.drive-shell` tokens — do not hardcode one-off colors unless spec requires it
