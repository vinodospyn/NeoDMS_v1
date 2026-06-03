# NeoDMS (Ospyn Neo My Drive)

Next.js document-management UI with a **Neo Drive** shell (sidebar + dashboard) and preserved **multi-layout template** demos.

## Start Here

| Doc | Contents |
|-----|----------|
| [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) | Architecture, URLs, golden rules |
| [docs/DRIVE_UI_GUIDE.md](docs/DRIVE_UI_GUIDE.md) | Drive colors, spacing, components |
| [docs/ROUTING_GUIDE.md](docs/ROUTING_GUIDE.md) | Route groups and navigation |
| [docs/TYPOGRAPHY_GUIDE.md](docs/TYPOGRAPHY_GUIDE.md) | Text scale |
| [docs/TABLE_BEHAVIOR_GUIDE.md](docs/TABLE_BEHAVIOR_GUIDE.md) | Table patterns |

**AI / Cursor rules:** `.cursor/rules/neodms-project-context.mdc` (always on), `neodms-drive-ui.mdc` (drive files), `ui-component-governance.mdc`.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open **http://localhost:3000/** — DMS dashboard (default).

Other entry points:

- `/owned-by-me` — Owned by me (file explorer)
- `/dashboard` — template header-shell demo (requests table)
- `/ui-showcase` — component gallery

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```
