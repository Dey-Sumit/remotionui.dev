import type { MetadataRoute } from "next"
import { catalog, siteConfig } from "@/components/site/catalog"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteConfig.baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...catalog.map((item) => ({
      url: `${siteConfig.baseUrl}/#${item.name}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
