"use client"

import { Link, Separator } from "@heroui/react"
import { RemotionUIMark } from "@/components/site/mark"
import { siteConfig } from "@/components/site/catalog"

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-5 pb-10 sm:px-8">
      <Separator />
      <div className="flex flex-col gap-4 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <RemotionUIMark className="size-5 opacity-80" />
          <span>
            <span className="font-medium text-foreground">{siteConfig.name}</span>{" "}
            · a shadcn-compatible registry for Remotion
          </span>
        </div>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/r/registry.json">registry.json</Link>
          <Link href="https://ui.shadcn.com/docs/registry" target="_blank" rel="noreferrer">
            shadcn registry
          </Link>
          <Link href="https://www.remotion.dev" target="_blank" rel="noreferrer">
            remotion.dev
          </Link>
        </nav>
      </div>
    </footer>
  )
}
