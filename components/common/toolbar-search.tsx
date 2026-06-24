"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type ToolbarSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  "aria-label"?: string
  className?: string
  debounceMs?: number
  showSubmitButton?: boolean
  showClearButton?: boolean
  size?: "default" | "lg"
  /** `fixed` keeps the 320px toolbar width; `fill` stretches to the parent width. */
  width?: "fixed" | "fill"
  onSubmit?: () => void
}

export function ToolbarSearch({
  value,
  onChange,
  placeholder = "Search",
  "aria-label": ariaLabel,
  className,
  debounceMs,
  showSubmitButton = true,
  showClearButton = false,
  size = "default",
  width = "fixed",
  onSubmit,
}: ToolbarSearchProps) {
  const [focused, setFocused] = React.useState(false)
  const [localValue, setLocalValue] = React.useState(value)
  const [prevValue, setPrevValue] = React.useState(value)
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const isDebounced = debounceMs != null && debounceMs > 0

  if (isDebounced && value !== prevValue) {
    setPrevValue(value)
    setLocalValue(value)
  }

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  const displayValue = isDebounced ? localValue : value
  const isActive = focused || displayValue.length > 0

  function emitChange(nextValue: string) {
    if (isDebounced) {
      setLocalValue(nextValue)
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      debounceRef.current = setTimeout(() => {
        onChange(nextValue)
      }, debounceMs)
      return
    }

    onChange(nextValue)
  }

  function handleClear() {
    emitChange("")
    if (isDebounced) {
      onChange("")
    }
  }

  const trailingPadding =
    showSubmitButton && showClearButton && displayValue
      ? "pr-20"
      : showSubmitButton
        ? "pr-10"
        : showClearButton && displayValue
          ? "pr-16"
          : "pr-3"

  return (
    <div
      className={cn(
        "toolbar-search relative flex items-center rounded-md border bg-background transition-[border-color,box-shadow,background-color]",
        width === "fill" ? "w-full min-w-0" : "w-[320px] shrink-0",
        size === "lg" ? "h-11" : "h-10",
        isActive
          ? "border-primary/50 ring-[3px] ring-primary/15"
          : "border-border/70 hover:border-border",
        className
      )}
    >
      <Search
        className={cn(
          "pointer-events-none absolute left-3 size-4 transition-colors",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
        aria-hidden
      />

      <Input
        type="search"
        value={displayValue}
        onChange={(event) => emitChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit?.()
          }
        }}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={cn(
          "h-full min-w-0 border-0 bg-transparent text-sm text-foreground shadow-none placeholder:text-muted-foreground focus-visible:border-0 focus-visible:ring-0",
          "pl-9",
          trailingPadding
        )}
      />

      {showClearButton && displayValue ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "absolute top-1/2 h-7 -translate-y-1/2 rounded-md px-2 text-xs text-muted-foreground hover:text-foreground",
            showSubmitButton ? "right-10" : "right-1.5"
          )}
          onClick={handleClear}
        >
          <X className="mr-1 size-3" />
          Clear
        </Button>
      ) : null}

      {showSubmitButton ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-1/2 right-1 size-8 -translate-y-1/2 rounded-md border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
          aria-label={ariaLabel ? `Submit ${ariaLabel}` : "Submit search"}
          onClick={onSubmit}
        >
          <Search className="size-4" strokeWidth={2.25} aria-hidden />
        </Button>
      ) : null}
    </div>
  )
}
