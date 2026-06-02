export const THEME_STORAGE_KEYS = {
  accent: "app-accent",
  radius: "app-radius",
  motion: "app-motion",
  scale: "app-scale",
} as const

export type ThemeAccent = "slate" | "emerald" | "navy" | "amethyst" | "teal" | "zinc"
export type ThemeRadius = "default" | "comfortable" | "compact"
export type ThemeMotion = "default" | "reduced"
export type ThemeScale = "sm" | "md" | "lg"

const ACCENT_VALUES: ThemeAccent[] = [
  "slate",
  "emerald",
  "navy",
  "amethyst",
  "teal",
  "zinc",
]
const RADIUS_VALUES: ThemeRadius[] = ["default", "comfortable", "compact"]
const MOTION_VALUES: ThemeMotion[] = ["default", "reduced"]
const SCALE_VALUES: ThemeScale[] = ["sm", "md", "lg"]

export function readStoredThemeValue<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T
): T {
  if (typeof window === "undefined") {
    return fallback
  }

  const rawValue = window.localStorage.getItem(key)
  if (rawValue && allowed.includes(rawValue as T)) {
    return rawValue as T
  }

  return fallback
}

export function persistThemePreference(key: string, value: string) {
  window.localStorage.setItem(key, value)
  document.cookie = `${key}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`
}

export function applyThemeAccent(accent: ThemeAccent) {
  document.documentElement.dataset.accent = accent
}

export function applyThemeRadius(radius: ThemeRadius) {
  document.documentElement.dataset.radius = radius
}

export function applyThemeMotion(motion: ThemeMotion) {
  document.documentElement.dataset.motion = motion
}

export function applyThemeScale(scale: ThemeScale) {
  document.documentElement.dataset.scale = scale
}

export function applyStoredThemePreferences() {
  const accent = readStoredThemeValue(
    THEME_STORAGE_KEYS.accent,
    ACCENT_VALUES,
    "emerald"
  )
  const radius = readStoredThemeValue(
    THEME_STORAGE_KEYS.radius,
    RADIUS_VALUES,
    "default"
  )
  const motion = readStoredThemeValue(
    THEME_STORAGE_KEYS.motion,
    MOTION_VALUES,
    "default"
  )
  const scale = readStoredThemeValue(
    THEME_STORAGE_KEYS.scale,
    SCALE_VALUES,
    "md"
  )

  applyThemeAccent(accent)
  applyThemeRadius(radius)
  applyThemeMotion(motion)
  applyThemeScale(scale)

  return { accent, radius, motion, scale }
}
