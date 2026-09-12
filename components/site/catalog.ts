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
    name: "text-reveal",
    title: "Text Reveal",
    description:
      "A masked slide-up reveal. Each letter or word rises out of a clipped row on its own spring.",
    tags: ["text", "reveal", "spring"],
    file: "registry/remotion/text-reveal/text-reveal.tsx",
  },
  {
    name: "spinning-text-wheel",
    title: "Spinning Text Wheel",
    description:
      "A 3D drum of options that spins down and settles on the first line, like a slot reel picking a winner.",
    tags: ["text", "3d", "loop"],
    file: "registry/remotion/spinning-text-wheel/spinning-text-wheel.tsx",
  },
  {
    name: "motion-text",
    title: "Motion Text",
    description:
      "A word on a soft gradient pill that springs up into place. Five colour presets, no fonts to load.",
    tags: ["text", "title", "gradient"],
    file: "registry/remotion/motion-text/motion-text.tsx",
  },
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
