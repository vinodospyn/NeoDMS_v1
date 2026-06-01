# Typography Guide

Use this guide to keep text sizing consistent across the app.

## Approved Text Scale

- `text-xs` (12px): helper/meta labels, compact status hints, tiny supporting text.
- `text-sm` (14px): default UI text for navigation, body copy, descriptions, form support text.
- `text-base` (16px): prominent UI labels (brand/product name in app chrome, emphasized body text).
- `text-lg` (18px): section lead-in text only when needed.
- `text-xl` (20px): avoid for page titles in this template; reserve for special marketing-like blocks.
- `text-2xl` (24px): page titles and primary section headings.

## Standard Usage By Area

- Sidebar navigation item labels: `text-sm font-medium`
- Header navigation labels: `text-sm font-medium`
- Product/app name in navbar: `text-base font-semibold`
- Page title (`h1`/top-level heading): `text-2xl font-semibold tracking-tight`
- Secondary card/section heading (`h2`): `text-base font-semibold` (or `text-2xl` if it is a page-level section)
- Page/card description text: `text-sm text-muted-foreground`

## Rules

1. Prefer semantic Tailwind tokens (`text-sm`, `text-base`, `text-2xl`) over arbitrary values.
2. Avoid arbitrary pixel classes like `text-[13px]`, `text-[15px]`, `text-[17px]` unless absolutely required.
3. Use `tracking-tight` for page titles only, not for routine body/nav text.
4. Keep navigation text at `text-sm` for density and consistency.

## Quick Checklist For New UI

- Is there any `text-[...]` class? Replace with nearest token.
- Do titles use `text-2xl font-semibold tracking-tight`?
- Do descriptions use `text-sm text-muted-foreground`?
- Do nav labels use `text-sm font-medium`?
