"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const THEME_OPTIONS = [
  {
    id: "light" as const,
    label: "Light",
    description: "Bright surfaces and high contrast for daytime use.",
    icon: Sun,
    iconClass: "text-amber-500",
    iconBgClass: "bg-amber-500/10",
  },
  {
    id: "dark" as const,
    label: "Dark",
    description: "Dimmed interface for low-light environments.",
    icon: Moon,
    iconClass: "text-sky-400",
    iconBgClass: "bg-sky-500/10",
  },
  {
    id: "system" as const,
    label: "System",
    description: "Follow your device appearance settings.",
    icon: Monitor,
    iconClass: "text-muted-foreground",
    iconBgClass: "bg-muted",
  },
]

export function SettingsThemeSection() {
  const { theme, setTheme } = useTheme()
  const activeTheme = theme ?? "system"

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Theme
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose how Neo Drive looks on this device.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon
          const isActive = activeTheme === option.id

          return (
            <Button
              key={option.id}
              type="button"
              variant="outline"
              className={cn(
                "h-auto flex-col items-start gap-3 rounded-xl border-border/70 p-4 text-left",
                isActive && "border-primary/40 bg-primary/5 ring-1 ring-primary/20"
              )}
              onClick={() => setTheme(option.id)}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  option.iconBgClass
                )}
              >
                <Icon className={cn("size-4", option.iconClass)} />
              </span>
              <span className="space-y-1">
                <span className="block text-sm font-medium text-foreground">
                  {option.label}
                </span>
                <span className="block text-xs leading-relaxed font-normal text-muted-foreground">
                  {option.description}
                </span>
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
