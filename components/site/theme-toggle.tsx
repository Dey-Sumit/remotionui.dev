"use client"

import * as React from "react"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"

const STORAGE_KEY = "remotion-ui-theme"

export function ThemeToggle() {
  const [dark, setDark] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
    } catch {}
    setDark(next)
  }

  return (
    <Tooltip delay={300}>
      <Button
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        isIconOnly
        variant="ghost"
        onPress={toggle}
      >
        <Icon
          icon={dark ? "gravity-ui:sun" : "gravity-ui:moon"}
          className="size-4"
        />
      </Button>
      <Tooltip.Content>{dark ? "Light theme" : "Dark theme"}</Tooltip.Content>
    </Tooltip>
  )
}

/** Runs before hydration so the stored theme applies without a flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`
