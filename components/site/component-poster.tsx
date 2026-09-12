"use client"

import type { CatalogItem } from "@/components/site/catalog"

/**
 * Card preview media. Plays the rendered loop from the CDN when one exists,
 * otherwise shows the composition's own ground as a poster.
 *
 * Deliberately NOT a <Player>: mounting four live Remotion compositions to fill
 * a grid renders every frame in the browser for previews nobody interacts with.
 * The detail page keeps the real player, where it earns its cost.
 */
export function ComponentPoster({ item }: { item: CatalogItem }) {
  const { ground, tone, video, poster } = item.preview

  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
      style={{ background: ground }}
    >
      {video ? (
        <video
          className="size-full object-cover"
          src={video}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={`${item.title} preview`}
        />
      ) : (
        <span
          className={`px-6 text-center text-lg font-medium tracking-[-0.02em] ${
            tone === "dark" ? "text-white/30" : "text-black/20"
          }`}
        >
          {item.title}
        </span>
      )}
    </div>
  )
}
