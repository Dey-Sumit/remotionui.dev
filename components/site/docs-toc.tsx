"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Icon } from "@iconify/react"
import { sectionsForPath } from "@/components/site/docs-sections"

/**
 * "On this page" rail. Highlights the section currently in view.
 *
 * The observer is the only state writer — it is a subscription to an external
 * system (scroll position), not a render-time derivation.
 *
 * The shell mounts this with `key={pathname}`. It has to: every
 * /components/<name> route shares one constant sections array, so the effect
 * would not re-run on navigation and the observer would keep watching the
 * previous page's detached headings. Remounting resets activeId too.
 */
export function DocsToc() {
  const pathname = usePathname()
  const sections = sectionsForPath(pathname)
  const [activeId, setActiveId] = React.useState("")

  React.useEffect(() => {
    if (sections.length === 0) return
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      // Bias the band to the upper third so the heading being read wins.
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [pathname, sections])

  if (sections.length === 0) return null

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3 px-5 py-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon
          icon="gravity-ui:bars-ascending-align-left"
          className="size-3.5 text-muted"
        />
        On this page
      </p>
      <ul className="flex flex-col gap-0.5">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={activeId === s.id ? "location" : undefined}
              className={`block py-1 text-sm no-underline ${s.level === 3 ? "ps-4" : ""} ${
                activeId === s.id
                  ? "font-medium text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
