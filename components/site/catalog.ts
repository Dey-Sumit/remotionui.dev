/**
 * Registry items shown on the site. Keep in sync with registry.json.
 * `file` is read at build time so the Code tab shows the real source.
 */
export type CatalogItem = {
  name: string
  title: string
  description: string
  tags: string[]
  file: string
}

export const catalog: CatalogItem[] = [
  {
    name: "kinetic-text",
    title: "Kinetic Text",
    description:
      "A headline that reveals word by word with spring motion, blur, and a soft accent glow.",
    tags: ["text", "intro", "spring"],
    file: "registry/remotion/kinetic-text/kinetic-text.tsx",
  },
]

export const siteConfig = {
  name: "Remotion UI",
  tagline: "Curated Remotion components, installed with one command.",
  description:
    "A shadcn-compatible registry of hand-made Remotion video components. Plain Remotion, no UI library, drop into any React project.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://remotionui.dev",
  github: "https://github.com/Dey-Sumit/remotionui.dev",
}

export function installCommand(name: string) {
  return `npx shadcn@latest add ${siteConfig.baseUrl}/r/${name}.json`
}
