/**
 * Section outline per docs page shape, for the "On this page" rail.
 *
 * Declared rather than scraped out of the DOM: the shapes are known at build
 * time, and the ids here are the same ones the pages put on their headings.
 * Add a section here whenever you add an `<h2 id>` to a docs page.
 */
export type DocsSection = { id: string; label: string; level?: number }

export const COMPONENT_SECTIONS: DocsSection[] = [
  { id: "usage", label: "Usage" },
  { id: "installation", label: "Installation" },
  { id: "props", label: "Props" },
]

export const GETTING_STARTED_SECTIONS: DocsSection[] = [
  { id: "requirements", label: "Requirements" },
  { id: "install", label: "Install a component" },
  { id: "use", label: "Use it" },
  { id: "next", label: "Next" },
]

/** Shared so callers can use the result as a stable effect dependency. */
const NO_SECTIONS: DocsSection[] = []

/** Index pages have no outline, so the rail renders nothing. */
export function sectionsForPath(pathname: string): DocsSection[] {
  if (pathname === "/getting-started") return GETTING_STARTED_SECTIONS
  if (pathname.startsWith("/components/")) return COMPONENT_SECTIONS
  return NO_SECTIONS
}
