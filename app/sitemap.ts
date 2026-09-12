import type { MetadataRoute } from "next"
import { catalog, siteConfig } from "@/components/site/catalog"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteConfig.baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteConfig.baseUrl}/components`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...catalog.map((item) => ({
      url: `${siteConfig.baseUrl}/components/${item.name}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
