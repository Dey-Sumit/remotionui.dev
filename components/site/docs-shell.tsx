"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AppLayout, Navbar, Sidebar } from "@heroui-pro/react"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { RemotionUIMark } from "@/components/site/mark"
import { DocsToc } from "@/components/site/docs-toc"
import { sectionsForPath } from "@/components/site/docs-sections"
import { SearchTrigger } from "@/components/site/search-trigger"
import { ComponentSearch, useSearchHotkey } from "@/components/site/component-search"
import { catalog, siteConfig } from "@/components/site/catalog"

const COMPONENTS_SECTION = {
  href: "/components",
  label: "Components",
  icon: "gravity-ui:cube",
}

const sections = [
  { href: "/getting-started", label: "Getting Started", icon: "gravity-ui:rocket" },
  COMPONENTS_SECTION,
]

/** Catalog items bucketed by their primary tag, so sidebar groups grow with it. */
function groupedCatalog() {
  const groups = new Map<string, typeof catalog>()
  for (const item of catalog) {
    const key = item.tags[0] ?? "other"
    groups.set(key, [...(groups.get(key) ?? []), item])
  }
  return [...groups.entries()]
}

function SidebarBrand() {
  return (
    <Link href="/" className="flex items-center gap-3 px-1 py-2 no-underline">
      <RemotionUIMark className="size-5" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-foreground">
          {siteConfig.name}
        </span>
        <span className="text-xs leading-tight text-muted">shadcn registry</span>
      </div>
    </Link>
  )
}

function SidebarNav({ keyPrefix }: { keyPrefix: string }) {
  const pathname = usePathname()

  return (
    <>
      <Sidebar.Group>
        <Sidebar.GroupLabel className="text-sm font-semibold text-foreground">
          Overview
        </Sidebar.GroupLabel>
        <Sidebar.Menu aria-label="Overview">
          <Sidebar.MenuItem
            href="/getting-started"
            id={`${keyPrefix}-start`}
            isCurrent={pathname === "/getting-started"}
            textValue="Installation"
          >
            <Sidebar.MenuLabel>Installation</Sidebar.MenuLabel>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem
            href="/components"
            id={`${keyPrefix}-all`}
            isCurrent={pathname === "/components"}
            textValue="All components"
          >
            <Sidebar.MenuLabel>All components</Sidebar.MenuLabel>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>

      {groupedCatalog().map(([tag, items]) => (
        <Sidebar.Group key={`${keyPrefix}-${tag}`}>
          <Sidebar.GroupLabel className="text-sm font-semibold capitalize text-foreground">
            {tag}
          </Sidebar.GroupLabel>
          <Sidebar.Menu aria-label={tag}>
            {items.map((item) => (
              <Sidebar.MenuItem
                key={`${keyPrefix}-${item.name}`}
                href={`/components/${item.name}`}
                id={`${keyPrefix}-${item.name}`}
                isCurrent={pathname === `/components/${item.name}`}
                textValue={item.title}
              >
                <Sidebar.MenuLabel>{item.title}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
      ))}
    </>
  )
}

function SidebarLinks({ keyPrefix }: { keyPrefix: string }) {
  return (
    <Sidebar.Menu aria-label="Links">
      <Sidebar.MenuItem href="/" id={`${keyPrefix}-home`} textValue="Home">
        <Sidebar.MenuIcon>
          <Icon icon="gravity-ui:house" className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Home</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem
        href={siteConfig.github}
        id={`${keyPrefix}-github`}
        target="_blank"
        textValue="GitHub"
      >
        <Sidebar.MenuIcon>
          <Icon icon="gravity-ui:logo-github" className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>GitHub</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}

function DocsSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <SidebarBrand />
        </Sidebar.Header>
        <Sidebar.Content>
          <SidebarNav keyPrefix="desktop" />
        </Sidebar.Content>
        <Sidebar.Footer>
          <SidebarLinks keyPrefix="desktop" />
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <SidebarBrand />
        </Sidebar.Header>
        <Sidebar.Content>
          <SidebarNav keyPrefix="mobile" />
        </Sidebar.Content>
        <Sidebar.Footer>
          <SidebarLinks keyPrefix="mobile" />
        </Sidebar.Footer>
      </Sidebar.Mobile>
    </>
  )
}

/** Bar 1: identity and global actions. */
function DocsNavbar({
  hasOutline,
  onSearch,
}: {
  hasOutline: boolean
  onSearch: () => void
}) {
  return (
    <Navbar maxWidth="full" height="3.5rem">
      <Navbar.Header className="px-3">
        <AppLayout.MenuToggle />
        <Sidebar.Trigger aria-label="Toggle sidebar" />
        <Navbar.Spacer />
        <SearchTrigger className="w-[200px]" onPress={onSearch} />
        <Navbar.Content>
          <Tooltip delay={300}>
            <Button
              aria-label="GitHub repository"
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={() => window.open(siteConfig.github, "_blank", "noreferrer")}
            >
              <Icon icon="gravity-ui:logo-github" className="size-4" />
            </Button>
            <Tooltip.Content>GitHub</Tooltip.Content>
          </Tooltip>
          {hasOutline ? (
            <AppLayout.AsideTrigger
              closedTooltip="Show page outline"
              openTooltip="Hide page outline"
            />
          ) : null}
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}

/**
 * Bar 2: section navigation.
 *
 * Plain links with a border, not <Tabs>: these change route rather than swap
 * panels, and the Tabs indicator measures its offset on mount, which lands in
 * the wrong place whenever the shell around it settles after hydration.
 */
function DocsToolbar() {
  const pathname = usePathname()
  const current =
    sections.find((s) => pathname.startsWith(s.href))?.href ??
    COMPONENTS_SECTION.href

  return (
    <nav
      aria-label="Documentation sections"
      className="flex h-14 items-center gap-1 border-b border-separator bg-background px-3"
    >
      {sections.map((s) => {
        const isCurrent = s.href === current
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={isCurrent ? "page" : undefined}
            className={`flex h-14 items-center gap-2 whitespace-nowrap border-b-2 px-3 text-sm no-underline ${
              isCurrent
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Icon icon={s.icon} className="size-4" />
            {s.label}
          </Link>
        )
      })}
    </nav>
  )
}

/** Docs-site AppLayout: sidebar + two chrome bars + an "On this page" rail. */
export function DocsShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const hasOutline = sectionsForPath(pathname).length > 0
  const [isSearchOpen, setSearchOpen] = React.useState(false)
  const open = React.useCallback(() => setSearchOpen(true), [])
  const toggle = React.useCallback(() => setSearchOpen((v) => !v), [])
  useSearchHotkey(toggle)

  return (
    <>
      <AppLayout
        navigate={router.push}
        navbar={<DocsNavbar hasOutline={hasOutline} onSearch={open} />}
        toolbar={<DocsToolbar />}
        sidebar={<DocsSidebar />}
        aside={hasOutline ? <DocsToc key={pathname} /> : undefined}
        sidebarCollapsible="offcanvas"
      >
        {children}
      </AppLayout>
      <ComponentSearch isOpen={isSearchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
