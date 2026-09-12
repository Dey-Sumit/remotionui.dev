"use client"

import NextLink from "next/link"
import { ComponentPoster } from "@/components/site/component-poster"
import type { CatalogItem } from "@/components/site/catalog"

/**
 * Surface card with an inset well: the outer radius (24) is the inner radius
 * (20) plus the 4px inset. The well is painted with the composition's own
 * ground, so the preview meets it without a seam.
 */
export function ComponentGridCard({ item }: { item: CatalogItem }) {
  return (
    <NextLink
      href={`/components/${item.name}`}
      className="group block no-underline"
      aria-label={item.title}
    >
      <div className="flex flex-col overflow-hidden rounded-[24px] bg-surface shadow-surface">
        <div className="m-1 overflow-hidden rounded-[20px] bg-preview-well">
          <div className="transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]">
            <ComponentPoster item={item} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
          <p className="shrink-0 truncate text-xs text-muted/60">
            {item.tags.join(" · ")}
          </p>
        </div>
      </div>
    </NextLink>
  )
}
