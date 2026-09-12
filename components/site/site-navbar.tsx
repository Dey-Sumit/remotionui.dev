"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Navbar } from "@heroui-pro/react/navbar"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { RemotionUIMark } from "@/components/site/mark"
import { ComponentSearch, useSearchHotkey } from "@/components/site/component-search"
import { SearchTrigger } from "@/components/site/search-trigger"
import { siteConfig } from "@/components/site/catalog"

const navItems = [{ href: "/components", label: "Components" }]

export function SiteNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSearchOpen, setSearchOpen] = React.useState(false)
  const open = React.useCallback(() => setSearchOpen(true), [])
  const toggle = React.useCallback(() => setSearchOpen((v) => !v), [])
  useSearchHotkey(toggle)

  return (
    <>
      <Navbar
        position="floating"
        maxWidth="full"
        navigate={router.push}
        className="top-4 mx-auto w-[calc(100%-2rem)] max-w-5xl rounded-full bg-surface backdrop-blur-[var(--glass-blur)] supports-[backdrop-filter]:bg-surface/70"
      >
        <Navbar.Header className="px-3">
          <Navbar.MenuToggle className="md:hidden" />

          <Navbar.Brand>
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <RemotionUIMark className="size-6" />
              <Navbar.Label className="font-semibold tracking-[-0.01em] text-foreground">
                {siteConfig.name}
              </Navbar.Label>
            </Link>
          </Navbar.Brand>

          <Navbar.Content className="hidden gap-0 md:flex">
            {navItems.map((item) => (
              <Navbar.Item
                key={item.href}
                className="px-2"
                href={item.href}
                isCurrent={pathname.startsWith(item.href)}
              >
                {item.label}
              </Navbar.Item>
            ))}
          </Navbar.Content>

          <Navbar.Spacer />

          <Navbar.Content className="hidden md:flex">
            <SearchTrigger className="w-[200px] rounded-full" onPress={open} />

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

          <Navbar.Content className="md:hidden">
            <Button aria-label="Search components" isIconOnly variant="ghost" size="sm" onPress={open}>
              <Icon icon="gravity-ui:magnifier" className="size-4" />
            </Button>
          </Navbar.Content>
        </Navbar.Header>

        <Navbar.Menu>
          {navItems.map((item) => (
            <Navbar.MenuItem
              key={item.href}
              href={item.href}
              isCurrent={pathname.startsWith(item.href)}
            >
              {item.label}
            </Navbar.MenuItem>
          ))}
          <Navbar.MenuItem href={siteConfig.github}>GitHub</Navbar.MenuItem>
        </Navbar.Menu>
      </Navbar>
      <ComponentSearch isOpen={isSearchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
