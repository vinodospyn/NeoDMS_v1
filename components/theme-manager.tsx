"use client"

import * as React from "react"
import {
  Check,
  CircleDot,
  Monitor,
  Moon,
  Settings2,
  Sun,
} from "lucide-react"
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
import { cn } from "@/lib/utils"
import {
  applyThemeAccent,
  applyThemeMotion,
  applyThemeRadius,
  applyThemeScale,
  persistThemePreference,
  readStoredThemeValue,
  THEME_STORAGE_KEYS,
  type ThemeAccent,
  type ThemeMotion,
  type ThemeRadius,
  type ThemeScale,
} from "@/lib/theme-preferences"

type ThemeMode = "light" | "dark" | "semi-dark" | "system"
type Accent = ThemeAccent
type Radius = ThemeRadius
type Motion = ThemeMotion
type Scale = ThemeScale

const ACCENT_OPTIONS: Array<{ id: Accent; previewClass: string }> = [
  { id: "slate", previewClass: "bg-slate-500" },
  { id: "emerald", previewClass: "bg-emerald-500" },
  { id: "navy", previewClass: "bg-blue-700" },
  { id: "amethyst", previewClass: "bg-purple-500" },
  { id: "teal", previewClass: "bg-cyan-500" },
  { id: "zinc", previewClass: "bg-zinc-500" },
]

const RADIUS_OPTIONS: Array<{ id: Radius; label: string }> = [
  { id: "compact", label: "Compact" },
  { id: "default", label: "Default" },
  { id: "comfortable", label: "Comfortable" },
]

const SCALE_OPTIONS: Array<{ id: Scale; label: string }> = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Default" },
  { id: "lg", label: "Large" },
]

const MOTION_OPTIONS: Array<{ id: Motion; label: string }> = [
  { id: "default", label: "Smooth" },
  { id: "reduced", label: "Reduced" },
]

const MODE_OPTIONS = [
  {
    id: "light" as const,
    label: "Light",
    icon: Sun,
    iconClass: "text-amber-500",
    iconBgClass: "bg-amber-500/10",
  },
  {
    id: "dark" as const,
    label: "Dark",
    icon: Moon,
    iconClass: "text-indigo-400",
    iconBgClass: "bg-indigo-500/10",
  },
  {
    id: "semi-dark" as const,
    label: "Semi dark",
    icon: CircleDot,
    iconClass: "text-violet-400",
    iconBgClass: "bg-violet-500/10",
  },
  {
    id: "system" as const,
    label: "System",
    icon: Monitor,
    iconClass: "text-sky-500",
    iconBgClass: "bg-sky-500/10",
  },
]

function ActiveThemeSummary({
  modeLabel,
  modeOption,
  accentOption,
}: {
  modeLabel: string
  modeOption: (typeof MODE_OPTIONS)[number]
  accentOption: (typeof ACCENT_OPTIONS)[number]
}) {
  const ModeIcon = modeOption.icon

  return (
    <div className="border-b border-border/60 pb-4">
      <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Active theme
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <span className="inline-flex items-center gap-2 text-foreground">
          <span
            className={cn(
              "inline-flex size-7 shrink-0 items-center justify-center rounded-md",
              modeOption.iconBgClass
            )}
          >
            <ModeIcon className={cn("size-3.5", modeOption.iconClass)} strokeWidth={2} />
          </span>
          <span className="font-medium">{modeLabel}</span>
        </span>

        <span className="text-border" aria-hidden>
          ·
        </span>

        <span className="inline-flex items-center gap-2 text-foreground">
          <span
            className={cn(
              "size-3.5 shrink-0 rounded-full ring-1 ring-border/60 ring-offset-1 ring-offset-background",
              accentOption.previewClass
            )}
            aria-hidden
          />
          <span className="font-medium capitalize">{accentOption.id}</span>
        </span>
      </div>
    </div>
  )
}

function SettingSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("border-b border-border/60 py-4", className)}>
      <h3 className="mb-3 text-xs font-medium text-muted-foreground">{title}</h3>
      {children}
    </section>
  )
}

function SettingRow({
  label,
  description,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 border-b border-border/40 py-2.5 text-left last:border-b-0",
        "transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm">{label}</span>
        {description ? (
          <span className="block text-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
      {isActive ? (
        <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
      ) : (
        <span className="size-4 shrink-0" aria-hidden />
      )}
    </button>
  )
}

function SettingSegment({
  options,
  value,
  onChange,
}: {
  options: Array<{ id: string; label: string }>
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => {
        const isActive = value === option.id

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export function ThemeManager({ trigger }: { trigger: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [accent, setAccent] = React.useState<Accent>(() =>
    readStoredThemeValue<Accent>(
      THEME_STORAGE_KEYS.accent,
      ACCENT_OPTIONS.map((item) => item.id),
      "emerald"
    )
  )
  const [radius, setRadius] = React.useState<Radius>(() =>
    readStoredThemeValue<Radius>(
      THEME_STORAGE_KEYS.radius,
      RADIUS_OPTIONS.map((item) => item.id),
      "default"
    )
  )
  const [motion, setMotion] = React.useState<Motion>(() =>
    readStoredThemeValue<Motion>(
      THEME_STORAGE_KEYS.motion,
      ["default", "reduced"],
      "default"
    )
  )
  const [scale, setScale] = React.useState<Scale>(() =>
    readStoredThemeValue<Scale>(
      THEME_STORAGE_KEYS.scale,
      SCALE_OPTIONS.map((item) => item.id),
      "md"
    )
  )

  React.useEffect(() => {
    applyThemeAccent(accent)
    applyThemeRadius(radius)
    applyThemeMotion(motion)
    applyThemeScale(scale)
    persistThemePreference(THEME_STORAGE_KEYS.accent, accent)
    persistThemePreference(THEME_STORAGE_KEYS.radius, radius)
    persistThemePreference(THEME_STORAGE_KEYS.motion, motion)
    persistThemePreference(THEME_STORAGE_KEYS.scale, scale)
  }, [accent, motion, radius, scale])

  function resetThemePreferences() {
    setAccent("emerald")
    setRadius("default")
    setMotion("default")
    setScale("md")
    setTheme("system")
  }

  const activeTheme = (theme ?? "system") as ThemeMode
  const activeModeOption =
    MODE_OPTIONS.find((option) => option.id === activeTheme) ?? MODE_OPTIONS[3]
  const activeAccentOption =
    ACCENT_OPTIONS.find((option) => option.id === accent) ?? ACCENT_OPTIONS[1]
  const currentModeLabel =
    activeTheme === "system"
      ? resolvedTheme === "dark"
        ? "System (dark)"
        : "System (light)"
      : activeModeOption.label

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-base">
            <Settings2 className="size-4" />
            Theme manager
          </SheetTitle>
          <SheetDescription>
            Appearance preferences apply instantly across the app.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-6 pt-2">
          <ActiveThemeSummary
            modeLabel={currentModeLabel}
            modeOption={activeModeOption}
            accentOption={activeAccentOption}
          />

          <SettingSection title="Appearance">
            {MODE_OPTIONS.map((option) => (
              <SettingRow
                key={option.id}
                label={option.label}
                icon={option.icon}
                isActive={activeTheme === option.id}
                onClick={() => setTheme(option.id)}
              />
            ))}
          </SettingSection>

          <SettingSection title="Accent">
            <div className="flex flex-wrap items-center gap-3">
              {ACCENT_OPTIONS.map((option) => {
                const isActive = accent === option.id

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={`Use ${option.id} accent`}
                    aria-pressed={isActive}
                    onClick={() => setAccent(option.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-1 pr-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "size-4 rounded-full",
                        option.previewClass,
                        isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      )}
                    />
                    <span className="text-sm capitalize">{option.id}</span>
                  </button>
                )
              })}
            </div>
          </SettingSection>

          <SettingSection title="Corner style">
            <SettingSegment
              options={RADIUS_OPTIONS}
              value={radius}
              onChange={(id) => setRadius(id as Radius)}
            />
          </SettingSection>

          <SettingSection title="Text scale">
            <SettingSegment
              options={SCALE_OPTIONS}
              value={scale}
              onChange={(id) => setScale(id as Scale)}
            />
          </SettingSection>

          <SettingSection title="Motion">
            <SettingSegment
              options={MOTION_OPTIONS}
              value={motion}
              onChange={(id) => setMotion(id as Motion)}
            />
          </SettingSection>

          <SettingSection title="Preview" className="border-b-0">
            <div className="space-y-3 border-t border-border/40 pt-3">
              <p className="text-xs text-muted-foreground">
                Sample controls reflect your current theme settings.
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
              </div>
            </div>
          </SettingSection>

          <Button
            type="button"
            variant="ghost"
            className="mt-2 h-9 w-full justify-start px-0 text-sm text-muted-foreground hover:text-foreground"
            onClick={resetThemePreferences}
          >
            Reset to defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
