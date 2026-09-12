"use client"

import * as React from "react"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"

const STORAGE_KEY = "remotion-ui-theme"

/**
 * Dark mode is parked. The site is light-only for now, so the toggle is not
 * mounted and the init script always applies `glass-light`. Everything below is
 * kept intact so switching it back on is a two-line change:
 *   1. render <ThemeToggle /> in site-navbar.tsx again
 *   2. restore the commented body of `themeInitScript`
 */

/** Glass preset from the HeroUI theme dashboard: `glass-light` / `glass-dark` on <html>. */
function applyTheme(dark: boolean) {
  const c = document.documentElement.classList
  c.toggle("dark", dark)
  c.toggle("glass-dark", dark)
  c.toggle("glass-light", !dark)
}

/** Subscribe to the `dark` class on <html> rather than mirroring it into state. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

export function ThemeToggle() {
  const dark = React.useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    applyTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
    } catch {}
  }

  return (
    <Tooltip delay={300}>
      <Button
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        isIconOnly
        variant="ghost"
        onPress={toggle}
      >
        <Icon icon={dark ? "gravity-ui:sun" : "gravity-ui:moon"} className="size-4" />
      </Button>
      <Tooltip.Content>{dark ? "Light theme" : "Dark theme"}</Tooltip.Content>
    </Tooltip>
  )
}

/** Runs before hydration. Light-only while dark mode is parked. */
export const themeInitScript = `document.documentElement.classList.add("glass-light");`

/* Dark-mode version of the init script, restore alongside <ThemeToggle />:
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;var c=document.documentElement.classList;c.add(d?"glass-dark":"glass-light");if(d)c.add("dark")}catch(e){}})();`
*/
