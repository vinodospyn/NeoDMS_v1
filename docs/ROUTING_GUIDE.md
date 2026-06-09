# Routing Guide

Next.js App Router **route groups** apply different shells. Parentheses in folder names are **not** part of the URL.

## Layout Modes

### `(with-sidebar)` — Neo Drive (default product)

- Sidebar (`AppSidebar`) + top header (`DocumentsAppHeader`)
- `.drive-shell` design tokens on `SidebarProvider`
- **Default entry:** `app/(with-sidebar)/page.tsx` → **`/`** (DMS dashboard)

### `(with-header)` — header shell (layout only)

- Top nav (`DashboardNavbar`) via `HeaderLayout`
- `layout.tsx` is kept; add `page.tsx` routes under this group when you need header-only screens

### `(minimal)` — full-screen shell (layout only)

- `MinimalLayout` with no sidebar or app header
- `layout.tsx` is kept; add pages here for onboarding, auth, or upload wizards

## Active Drive URLs

| File | URL |
|------|-----|
| `app/(with-sidebar)/page.tsx` | `/` |
| `app/(with-sidebar)/owned-by-me/page.tsx` | `/owned-by-me` |
| `app/(with-sidebar)/shared-with-me/page.tsx` | `/shared-with-me` |
| `app/(with-sidebar)/shared-by-me/page.tsx` | `/shared-by-me` |
| `app/(with-sidebar)/quick-access/page.tsx` | `/quick-access` |
| `app/(with-sidebar)/recent/page.tsx` | `/recent` |
| `app/(with-sidebar)/trash/page.tsx` | `/trash` |
| `app/(with-sidebar)/settings/page.tsx` | `/settings` |

## Recommended Flow

1. User opens **`/`** → dashboard (Quick access, Recent Files).
2. Sidebar navigates to Owned by me, Shared, etc.
3. Settings at `/settings`.

## New Route Checklist

1. Add a folder + `page.tsx` under `app/(with-sidebar)/`.
2. Implement UI in `features/drive/components/`.
3. Register in `config/nav/sidebar-nav.ts` if it appears in the sidebar.
4. Add title in `ROUTE_TITLES` inside `documents-app-header.tsx`.

## Navigation Configuration

| File | Purpose |
|------|---------|
| `config/nav/sidebar-nav.ts` | Drive sidebar (main + `sidebarSettingsNavItem`) |
| `config/nav/header-nav.ts` | Reserved for `(with-header)` pages |
| `config/nav/settings.ts` | `navMode`: `"separate"` (default) or `"shared"` |
| `config/nav/resolver.ts` | `getSidebarNavItems()` / `getHeaderNavItems()` |

## Troubleshooting

After route changes, clear the Next.js cache:

```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
pnpm dev
```
