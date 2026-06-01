"use client"

import * as React from "react"
import {
  Check,
  CircleDot,
  Monitor,
  Moon,
  Palette,
  Settings2,
  Sparkles,
  Sun,
  Type,
  Zap,
} from "lucide-react"
import { motion as MotionElement } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type ThemeMode = "light" | "dark" | "semi-dark" | "system"
type Accent = "slate" | "emerald" | "navy" | "amethyst" | "teal" | "zinc"
type Radius = "default" | "comfortable" | "compact"
type Motion = "default" | "reduced"
type Scale = "sm" | "md" | "lg"

const STORAGE_KEYS = {
  accent: "app-accent",
  radius: "app-radius",
  motion: "app-motion",
  scale: "app-scale",
} as const

const ACCENT_OPTIONS: Array<{ id: Accent; previewClass: string; glowClass: string }> = [
  { id: "slate", previewClass: "bg-slate-500", glowClass: "shadow-slate-500/50" },
  { id: "emerald", previewClass: "bg-emerald-500", glowClass: "shadow-emerald-500/50" },
  { id: "navy", previewClass: "bg-blue-700", glowClass: "shadow-blue-700/50" },
  { id: "amethyst", previewClass: "bg-purple-500", glowClass: "shadow-purple-500/50" },
  { id: "teal", previewClass: "bg-cyan-500", glowClass: "shadow-cyan-500/50" },
  { id: "zinc", previewClass: "bg-zinc-500", glowClass: "shadow-zinc-500/50" },
]

const RADIUS_OPTIONS: Array<{ id: Radius; label: string }> = [
  { id: "compact", label: "Compact" },
  { id: "default", label: "Default" },
  { id: "comfortable", label: "Comfortable" },
]

const SCALE_OPTIONS: Array<{ id: Scale; label: string; preview: string }> = [
  { id: "sm", label: "Small", preview: "90%" },
  { id: "md", label: "Default", preview: "100%" },
  { id: "lg", label: "Large", preview: "110%" },
]

const MODE_OPTIONS = [
  {
    id: "light" as const,
    label: "Light",
    description: "Clean daytime canvas",
    icon: Sun,
    iconClass: "text-amber-500",
  },
  {
    id: "dark" as const,
    label: "Dark",
    description: "Focused low-glare mode",
    icon: Moon,
    iconClass: "text-indigo-400",
  },
  {
    id: "semi-dark" as const,
    label: "Semi dark",
    description: "Light content, dark sidebar",
    icon: CircleDot,
    iconClass: "text-violet-400",
  },
  {
    id: "system" as const,
    label: "System",
    description: "Follow device setting",
    icon: Monitor,
    iconClass: "text-sky-400",
  },
]

function readStoredValue<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  if (typeof window === "undefined") {
    return fallback
  }

  const rawValue = window.localStorage.getItem(key)
  if (rawValue && allowed.includes(rawValue as T)) {
    return rawValue as T
  }

  return fallback
}

function persistPreference(key: string, value: string) {
  window.localStorage.setItem(key, value)
  document.cookie = `${key}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`
}

function applyAccent(accent: Accent) {
  document.documentElement.dataset.accent = accent
}

function applyRadius(radius: Radius) {
  document.documentElement.dataset.radius = radius
}

function applyMotion(motion: Motion) {
  document.documentElement.dataset.motion = motion
}

function applyScale(scale: Scale) {
  document.documentElement.dataset.scale = scale
}

export function ThemeManager({ trigger }: { trigger: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [accent, setAccent] = React.useState<Accent>(() =>
    readStoredValue<Accent>(STORAGE_KEYS.accent, ACCENT_OPTIONS.map((item) => item.id), "emerald")
  )
  const [radius, setRadius] = React.useState<Radius>(() =>
    readStoredValue<Radius>(STORAGE_KEYS.radius, RADIUS_OPTIONS.map((item) => item.id), "default")
  )
  const [motion, setMotion] = React.useState<Motion>(() =>
    readStoredValue<Motion>(STORAGE_KEYS.motion, ["default", "reduced"], "default")
  )
  const [scale, setScale] = React.useState<Scale>(() =>
    readStoredValue<Scale>(STORAGE_KEYS.scale, SCALE_OPTIONS.map((item) => item.id), "md")
  )
  React.useEffect(() => {
    applyAccent(accent)
    applyRadius(radius)
    applyMotion(motion)
    applyScale(scale)
    persistPreference(STORAGE_KEYS.accent, accent)
    persistPreference(STORAGE_KEYS.radius, radius)
    persistPreference(STORAGE_KEYS.motion, motion)
    persistPreference(STORAGE_KEYS.scale, scale)
  }, [accent, motion, radius, scale])

  function onAccentChange(nextAccent: Accent) {
    setAccent(nextAccent)
  }

  function onRadiusChange(nextRadius: Radius) {
    setRadius(nextRadius)
  }

  function onMotionChange(nextMotion: Motion) {
    setMotion(nextMotion)
  }

  function onScaleChange(nextScale: Scale) {
    setScale(nextScale)
  }

  function resetThemePreferences() {
    onAccentChange("emerald")
    onRadiusChange("default")
    onMotionChange("default")
    onScaleChange("md")
    setTheme("system")
  }

  const activeTheme = (theme ?? "system") as ThemeMode
  const currentModeLabel =
    activeTheme === "semi-dark"
      ? "semi dark"
      : activeTheme === "system"
        ? resolvedTheme ?? "system"
        : activeTheme

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="overflow-y-auto bg-linear-to-b from-background to-muted/30 sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings2 className="size-4" />
            Theme manager
          </SheetTitle>
          <SheetDescription>
            Personalize appearance with live previews. Changes apply instantly across the app.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 px-4 pb-4 pt-3">
          <div className="flex items-center justify-between rounded-xl border bg-card/70 px-3 py-2.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="capitalize">{currentModeLabel}</span>
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="capitalize">{accent}</span>
          </div>

          <section className="space-y-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <h3 className="text-sm font-semibold tracking-tight">Appearance mode</h3>
            <div className="rounded-xl border bg-background/70 p-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                {MODE_OPTIONS.map((option) => {
                  const isActive = activeTheme === option.id
                  const Icon = option.icon

                  return (
                    <MotionElement.button
                      key={option.id}
                      type="button"
                      onClick={() => setTheme(option.id)}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 360, damping: 26 }}
                      className={cn(
                        "relative min-h-20 overflow-hidden rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isActive
                          ? "border-primary/35 bg-card shadow-sm"
                          : "border-transparent bg-transparent hover:border-border/70 hover:bg-muted/50"
                      )}
                    >
                      {isActive ? (
                        <MotionElement.span
                          layoutId="active-theme-pill"
                          className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-transparent"
                          transition={{ type: "spring", stiffness: 340, damping: 28 }}
                        />
                      ) : null}
                      <span className="relative z-10 flex items-start justify-between gap-2">
                        <span className="space-y-1">
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <span
                              className={cn(
                                "inline-flex size-6 items-center justify-center rounded-md bg-background shadow-xs",
                                option.iconClass
                              )}
                            >
                              <Icon className="size-3.5" />
                            </span>
                            {option.label}
                          </span>
                          <span className="block text-[11px] leading-relaxed text-muted-foreground">
                            {option.description}
                          </span>
                        </span>
                        {isActive ? (
                          <MotionElement.span
                            initial={{ scale: 0.7, opacity: 0.35 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                          >
                            <Check className="size-3.5" />
                          </MotionElement.span>
                        ) : null}
                      </span>
                    </MotionElement.button>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <h3 className="text-sm font-semibold tracking-tight">Accent palette</h3>
            <div className="grid grid-cols-6 gap-2">
              {ACCENT_OPTIONS.map((option) => (
                <MotionElement.button
                  key={option.id}
                  type="button"
                  aria-label={`Use ${option.id} accent`}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "group relative flex h-12 w-full items-center justify-center rounded-xl border bg-background/85 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    accent === option.id
                      ? "border-primary/40 shadow-sm ring-2 ring-primary/25"
                      : "border-border hover:border-border/80 hover:bg-muted/40"
                  )}
                  onClick={() => onAccentChange(option.id)}
                >
                  <span
                    className={cn(
                      "size-6 rounded-full shadow-[0_0_0_1px_hsl(var(--background))] transition-transform group-hover:scale-105",
                      option.previewClass,
                      option.glowClass
                    )}
                  />
                  {accent === option.id ? (
                    <MotionElement.span
                      initial={{ scale: 0.7, opacity: 0.3 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -right-1 -top-1 inline-flex size-4.5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                    >
                      <Check className="size-3" />
                    </MotionElement.span>
                  ) : null}
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 z-20 hidden -translate-x-1/2 rounded-md border bg-popover px-2 py-1 text-[10px] font-medium capitalize text-popover-foreground shadow-md group-hover:block">
                    {option.id}
                  </span>
                </MotionElement.button>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <h3 className="text-sm font-semibold tracking-tight">Corner style</h3>
            <div className="grid grid-cols-3 gap-2">
              {RADIUS_OPTIONS.map((option) => (
                <MotionElement.button
                  key={option.id}
                  type="button"
                  onClick={() => onRadiusChange(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                    radius === option.id
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border bg-background/70 text-muted-foreground hover:bg-muted/40"
                  )}
                >
                  {option.label}
                </MotionElement.button>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Type className="size-4 text-muted-foreground" />
              Text scale
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SCALE_OPTIONS.map((option) => (
                <MotionElement.button
                  key={option.id}
                  type="button"
                  onClick={() => onScaleChange(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                    scale === option.id
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border bg-background/70 text-muted-foreground hover:bg-muted/40"
                  )}
                >
                  {option.preview}
                </MotionElement.button>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="size-4 text-muted-foreground" />
              Motion
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <MotionElement.button
                type="button"
                onClick={() => onMotionChange("default")}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                  motion === "default"
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-background/70 text-muted-foreground hover:bg-muted/40"
                )}
              >
                Smooth
              </MotionElement.button>
              <MotionElement.button
                type="button"
                onClick={() => onMotionChange("reduced")}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                  motion === "reduced"
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-background/70 text-muted-foreground hover:bg-muted/40"
                )}
              >
                Reduced
              </MotionElement.button>
            </div>
          </section>

          <div className="rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <p className="mb-2 text-xs text-muted-foreground">Live preview</p>
            <div className="space-y-3 rounded-xl border bg-background p-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-2.5 py-2">
                <p className="text-sm font-medium">Workspace sample</p>
                <span className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground">
                  <Palette className="size-3" />
                  {accent}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Accent, radius, text scale, and animation preferences update instantly.
              </p>
              <div className="flex items-center justify-between gap-2">
                <Button size="sm" className="rounded-full">
                  Primary action
                </Button>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
                <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium uppercase text-muted-foreground">
                  {motion === "default" ? "smooth" : "reduced"}
                </span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-xl border-dashed bg-background/70"
            onClick={resetThemePreferences}
          >
            <Sparkles className="size-4" />
            Reset to recommended defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
