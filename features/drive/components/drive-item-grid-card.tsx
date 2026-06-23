"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { appConfig } from "@/config/app"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import type { DriveItem } from "@/features/drive/types"
import { cn } from "@/lib/utils"

/** Baseline was 4 columns; scale card chrome proportionally for 5-up grid. */
export const DRIVE_GRID_COLUMNS = 5
const GRID_SCALE = 4 / DRIVE_GRID_COLUMNS

export type DriveItemGridCardProps = {
  item: DriveItem
  subtitle?: string
  selected?: boolean
  checked?: boolean
  onSelect?: () => void
  onCheckedChange?: (checked: boolean) => void
  actions?: React.ReactNode
  className?: string
}

function defaultSubtitle(item: DriveItem) {
  return `${appConfig.userDisplayName} - ${item.workspace}`
}

export function DriveItemGridCard({
  item,
  subtitle = defaultSubtitle(item),
  selected = false,
  checked = false,
  onSelect,
  onCheckedChange,
  actions,
  className,
}: DriveItemGridCardProps) {
  const isSharedFolder = item.type === "shared-folder"

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect?.()
        }
      }}
      className={cn(
        "group relative flex cursor-pointer flex-col text-left transition-[border-color,background-color]",
        "rounded-xl border border-border/70 bg-background hover:border-border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        selected && "border-primary/40 bg-sky-50/50 ring-1 ring-primary/20 dark:bg-sky-950/20",
        className
      )}
      style={{
        gap: `${1 * GRID_SCALE}rem`,
        padding: `${1.25 * GRID_SCALE}rem`,
      }}
    >
      <div className="relative flex min-w-0 items-start gap-2">
        {onCheckedChange ? (
          <div
            className="shrink-0 pt-0.5"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => onCheckedChange(value === true)}
              aria-label={`Select ${item.name}`}
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1 pr-7">
          <p
            className="truncate font-semibold text-foreground"
            style={{ fontSize: `${1 * GRID_SCALE}rem`, lineHeight: 1.3 }}
          >
            {item.name}
          </p>
          <p
            className="mt-0.5 truncate text-muted-foreground"
            style={{ fontSize: `${0.8125 * GRID_SCALE}rem`, lineHeight: 1.35 }}
          >
            {subtitle}
          </p>
        </div>

        {actions ? (
          <div
            className="absolute top-0 right-0 z-10"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {actions}
          </div>
        ) : null}
      </div>

      <div
        className="flex w-full items-center justify-center rounded-lg bg-muted/35"
        style={{ height: `${9 * GRID_SCALE}rem` }}
      >
        <FileTypeIcon
          kind={item.type}
          name={item.name}
          explicitType={item.type}
          shared={isSharedFolder}
          variant="brand"
          size="xl"
        />
      </div>
    </article>
  )
}
