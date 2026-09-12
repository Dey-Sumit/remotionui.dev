"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AppLayout, Navbar, Sidebar } from "@heroui-pro/react"
import { Button, Kbd, SearchField, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { RemotionUIMark } from "@/components/site/mark"
import { ComponentSearch, useSearchHotkey } from "@/components/site/component-search"
import { catalog, siteConfig } from "@/components/site/catalog"

/** Catalog items bucketed by their primary tag, so the sidebar groups grow with it. */
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
        <Sidebar.GroupLabel className="flex items-center gap-2">
          <Icon icon="gravity-ui:rocket" className="size-3.5 text-muted" />
          Overview
        </Sidebar.GroupLabel>
        <Sidebar.Menu aria-label="Overview">
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
          <Sidebar.GroupLabel className="flex items-center gap-2">
            <Icon icon="gravity-ui:cube" className="size-3.5 text-muted" />
            <span className="capitalize">{tag}</span>
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

function DocsNavbar({ onSearch }: { onSearch: () => void }) {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Navbar.Spacer />
        {/* Read-only trigger: typing happens in the ⌘K palette. */}
        <SearchField
          aria-label="Search components"
          className="w-[220px]"
          variant="secondary"
          onFocus={onSearch}
        >
          <SearchField.Group className="h-8">
            <SearchField.SearchIcon />
            <SearchField.Input className="w-24" placeholder="Search components…" readOnly />
            <Kbd className="pointer-events-none mr-1.5 text-xs">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
          </SearchField.Group>
        </SearchField>
        <Navbar.Spacer />
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
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}

/** Docs-site AppLayout: grouped sidebar nav + search, shared by every /components route. */
export function DocsShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isSearchOpen, setSearchOpen] = React.useState(false)
  const open = React.useCallback(() => setSearchOpen(true), [])
  useSearchHotkey(open)

  return (
    <>
      <AppLayout
        navigate={router.push}
        navbar={<DocsNavbar onSearch={open} />}
        sidebar={<DocsSidebar />}
        sidebarCollapsible="offcanvas"
      >
        {children}
      </AppLayout>
      <ComponentSearch isOpen={isSearchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
