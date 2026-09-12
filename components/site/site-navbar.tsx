"use client"

import Link from "next/link"
import { Navbar } from "@heroui-pro/react/navbar"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { RemotionUIMark } from "@/components/site/mark"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { siteConfig } from "@/components/site/catalog"

const links = [
  { href: "#components", label: "Components" },
  { href: "/r/registry.json", label: "Registry" },
  { href: "https://www.remotion.dev/docs", label: "Remotion docs" },
]

export function SiteNavbar() {
  return (
    <Navbar position="sticky" maxWidth="lg" hideOnScroll={false}>
      <Navbar.Header>
        <Navbar.Brand>
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <RemotionUIMark className="size-6" />
            <Navbar.Label className="font-semibold tracking-[-0.01em] text-foreground">
              {siteConfig.name}
            </Navbar.Label>
          </Link>
        </Navbar.Brand>
        <Navbar.Content className="hidden sm:flex">
          {links.map((l) => (
            <Navbar.Item key={l.href} href={l.href}>
              {l.label}
            </Navbar.Item>
          ))}
        </Navbar.Content>
        <Navbar.Spacer />
        <Navbar.Content>
          <Tooltip delay={300}>
            <Button
              aria-label="GitHub repository"
              isIconOnly
              variant="ghost"
              onPress={() => window.open(siteConfig.github, "_blank", "noreferrer")}
            >
              <Icon icon="gravity-ui:logo-github" className="size-4" />
            </Button>
            <Tooltip.Content>GitHub</Tooltip.Content>
          </Tooltip>
          <ThemeToggle />
          <Navbar.MenuToggle className="sm:hidden" />
        </Navbar.Content>
      </Navbar.Header>
      <Navbar.Menu>
        {links.map((l) => (
          <Navbar.MenuItem key={l.href} href={l.href}>
            {l.label}
          </Navbar.MenuItem>
        ))}
      </Navbar.Menu>
    </Navbar>
  )
}
