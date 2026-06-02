"use client"

import * as React from "react"

import { applyStoredThemePreferences } from "@/lib/theme-preferences"

/** Applies accent/radius/motion/scale from localStorage on every page load. */
export function ThemePreferencesHydrator() {
  React.useEffect(() => {
    applyStoredThemePreferences()
  }, [])

  return null
}
