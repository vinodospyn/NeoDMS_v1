# NeoDMS — Ospyn Neo My Drive

A Next.js document-management UI (**Ospyn Neo My Drive**) with the drive shell as the default product. Layout route groups are kept for future alternate shells.

## Layout Modes

| Mode | Route group | Use |
|------|-------------|-----|
| **Neo Drive (default)** | `(with-sidebar)` | Production DMS UI — sidebar + header + drive surface |
| Header-only | `(with-header)` | Layout shell only (add pages when needed) |
| Minimal | `(minimal)` | Full-screen layout shell only |

## Folder Guide

```text
app/
  layout.tsx
  (with-sidebar)/
    layout.tsx              # driveShell + AppSidebar + DocumentsAppHeader
    page.tsx                # /  → DriveDashboardPage (DEFAULT)
    owned-by-me/page.tsx    # Owned by me → FileExplorerPage
    shared-with-me/ …       # placeholders (sidebar nav)
    settings/page.tsx
  (with-header)/layout.tsx  # HeaderLayout shell (no demo pages)
  (minimal)/layout.tsx      # MinimalLayout shell (no demo pages)

components/
  layout/                   # app-sidebar, documents-app-header, *-layout
  ui/                       # shadcn primitives

features/
  drive/                    # Dashboard, quick access, explorer, mocks

config/
  app.ts                    # Branding, user, workspace, storage
  nav/sidebar-nav.ts        # Drive sidebar navigation
```

## App Branding (`config/app.ts`)

| Field | Purpose |
|-------|---------|
| `productName` | “Ospyn Neo” in sidebar |
| `driveName` | “My Drive” under logo |
| `userDisplayName` / `userEmail` | Header profile |
| `workspaceName` | Workspace selector label |
| `storageUsedGb` / `storageTotalGb` | Sidebar storage meter |

## Golden Rules

1. Keep route files thin — compose from `features/drive/components`.
2. Drive shell chrome lives in `components/layout/`.
3. Drive product logic and mocks live in `features/drive/`.
4. Pick route group by shell; parentheses are not in the URL.
5. Reuse `components/ui/*` per `.cursor/rules/ui-component-governance.mdc`.

## URLs to Test

| URL | Screen |
|-----|--------|
| `/` | Dashboard — Quick access + Recent Files |
| `/owned-by-me` | Owned by me — file explorer |
| `/shared-with-me` | Shared with me (placeholder) |
| `/shared-by-me` | Shared by me (placeholder) |
| `/quick-access` | Quick access (placeholder) |
| `/recent` | Recent (placeholder) |
| `/trash` | Trash (placeholder) |
| `/settings` | Settings (placeholder) |

## Create a New Drive Page

1. Add `app/(with-sidebar)/your-route/page.tsx` (thin wrapper).
2. Build UI in `features/drive/components/`.
3. Register in `config/nav/sidebar-nav.ts` and `ROUTE_TITLES` in `documents-app-header.tsx`.
4. Follow `docs/DRIVE_UI_GUIDE.md` for visuals.

Example:

```tsx
import { DrivePlaceholderPage } from "@/features/drive/components/drive-placeholder-page"

export default function Page() {
  return <DrivePlaceholderPage title="Shared with me" />
}
```

## Commands

```bash
pnpm install
pnpm dev          # opens at http://localhost:3000/ (dashboard)
pnpm lint
pnpm typecheck
pnpm build
```

## Related Docs

- `docs/ROUTING_GUIDE.md` — route groups
- `docs/DRIVE_UI_GUIDE.md` — colors, spacing, component map
- `docs/TYPOGRAPHY_GUIDE.md` — text scale
- `docs/TABLE_BEHAVIOR_GUIDE.md` — table primitives vs file explorer
- `.cursor/rules/neodms-project-context.mdc` — AI agent context (always on)
- `.cursor/rules/neodms-drive-ui.mdc` — drive UI rules when editing drive files
