# Routing Guide

Next.js App Router **route groups** apply different shells. Parentheses in folder names are **not** part of the URL.

## Layout Modes

### `(with-sidebar)` — Neo Drive (default product)

- Dark sidebar (`AppSidebar`) + top header (`DocumentsAppHeader`)
- `.drive-shell` design tokens on `SidebarProvider`
- **Default entry:** `app/(with-sidebar)/page.tsx` → **`/`** (DMS dashboard)

### `(with-header)` — template demo

- Top nav only (`DashboardNavbar`)
- Separate nav config: `config/nav/header-nav.ts`
- Examples: `/dashboard`, `/documents`, `/ui-showcase`

### `(minimal)` — full-screen

- No sidebar or app header
- Examples: `/learn-minimal`, `/document-upload`, `/minimal-demo`

## URL Examples

| File | URL |
|------|-----|
| `app/(with-sidebar)/page.tsx` | `/` |
| `app/(with-sidebar)/sample-sidebar/documents/page.tsx` | `/sample-sidebar/documents` |
| `app/(with-sidebar)/sample-sidebar/page.tsx` | `/sample-sidebar` → redirects to `/` |
| `app/(with-header)/dashboard/page.tsx` | `/dashboard` |
| `app/(minimal)/learn-minimal/page.tsx` | `/learn-minimal` |

## Recommended Flows

### Neo Drive (current default)

1. User opens **`/`** → dashboard with sidebar (Quick access, Recent Files).
2. Sidebar navigates to Owned by me, Shared, etc.
3. Settings at `/sample-sidebar/settings` includes template **ThemeManager**.

### Template handoff (optional, not default)

1. Minimal entry e.g. `/learn-minimal` for marketing/onboarding.
2. CTA into `(with-header)` `/dashboard` or into Neo Drive at `/`.

Do not document `/` as redirecting to `/learn-minimal` — that is no longer the default.

## Naming Conventions

- Route groups: `(minimal)`, `(with-sidebar)`, `(with-header)`
- Segments: feature intent (`documents`, `settings`) not UI chrome (`topbar-demo`)
- Prefer adding drive routes under `(with-sidebar)/` and registering in `sidebar-nav.ts`

## New Route Checklist

1. Choose shell (`with-sidebar` for drive features).
2. Create thin `page.tsx` in that group.
3. Implement in `features/drive/` (or appropriate feature folder).
4. Update `config/nav/sidebar-nav.ts` if the item appears in sidebar.
5. Update `ROUTE_TITLES` in `components/layout/documents-app-header.tsx` for drive header title.

## Navigation Configuration

| File | Purpose |
|------|---------|
| `config/nav/sidebar-nav.ts` | Drive sidebar (main + `sidebarSettingsNavItem`) |
| `config/nav/header-nav.ts` | Header-only shell |
| `config/nav/settings.ts` | `navMode`: `"separate"` (default) or `"shared"` |
| `config/nav/resolver.ts` | `getSidebarNavItems()` / `getHeaderNavItems()` |

Use **`navMode = "separate"`** so drive sidebar and header demo nav do not share the same route list.

## UI Showcase

`/ui-showcase` lives in `(with-header)`. Keep it out of `sidebar-nav.ts`. Use for component reference only.

## Troubleshooting

After route group renames or new root `page.tsx`, clear the Next.js cache:

```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
pnpm dev
```
