/**
 * Registry items shown on the site. Keep in sync with registry.json.
 * `file` is read at build time so the Code tab shows the real source.
 */
export type CatalogProp = {
  name: string
  type: string
  default: string
  description: string
}

/**
 * Card preview media.
 *
 * `ground` is the exact background the composition renders on, not a colour
 * picked to look nice — so a preview masked at its foot dissolves into the well
 * with no visible seam. Compositions that paint no background of their own fall
 * back to the `--preview-well` token.
 *
 * `video` points at a rendered loop on the platform CDN. None are rendered yet,
 * so every item currently shows its `ground` as a poster.
 */
export type CatalogPreview = {
  ground: string
  /** Whether `ground` is dark, so the poster label picks a contrasting ink. */
  tone?: "light" | "dark"
  video?: string
  poster?: string
}

export type CatalogItem = {
  name: string
  title: string
  description: string
  tags: string[]
  file: string
  /** Extra npm packages the item pulls in beyond `remotion`. */
  dependencies: string[]
  preview: CatalogPreview
  props: CatalogProp[]
}

/** Rendered previews live at https://cdn.videocaptions.ai/remotionui/<name>.mp4 */
export const PREVIEW_CDN = "https://cdn.videocaptions.ai/remotionui"

export const catalog: CatalogItem[] = [
  {
    name: "text-reveal",
    title: "Text Reveal",
    description:
      "A masked slide-up reveal. Each letter or word rises out of a clipped row on its own spring.",
    tags: ["text", "reveal", "spring"],
    file: "registry/remotion/text-reveal/text-reveal.tsx",
    dependencies: ["@remotion/google-fonts", "zod"],
    // gradient-bg variant: mint wash
    preview: { ground: "linear-gradient(160deg, #ecfdf5 0%, #d1fae5 100%)" },
    props: [
      { name: "text", type: "string", default: '"Introducing"', description: "The line to reveal." },
      {
        name: "mode",
        type: '"letter" | "word" | "auto"',
        default: '"auto"',
        description: "Split the line per letter, per word, or pick based on length.",
      },
      {
        name: "variant",
        type: '"solid" | "gradient" | "gradient-bg"',
        default: '"solid"',
        description: "Flat colour, gradient text, or gradient text on a gradient backdrop.",
      },
      { name: "color", type: "string", default: '"#0f0f0f"', description: "Text colour for the solid variant." },
      { name: "bgColor", type: "string", default: '"#fafaf9"', description: "Background fill behind the text." },
      { name: "stagger", type: "number", default: "0", description: "Frames between units. 0 picks a sensible value." },
      {
        name: "durationInFrames",
        type: "number",
        default: "90",
        description: "Total length; the reveal timing scales to fit.",
      },
      { name: "exitAnimation", type: "boolean", default: "false", description: "Slide the line back out before the end." },
      { name: "fontFamily", type: "string", default: '""', description: "Override the bundled font stack." },
      { name: "fontWeight", type: "number", default: "0", description: "Override the weight. 0 keeps the default." },
    ],
  },
  {
    name: "spinning-text-wheel",
    title: "Spinning Text Wheel",
    description:
      "A 3D drum of options that spins down and settles on the first line, like a slot reel picking a winner.",
    tags: ["text", "3d", "loop"],
    file: "registry/remotion/spinning-text-wheel/spinning-text-wheel.tsx",
    dependencies: ["@remotion/google-fonts", "zod"],
    // bgColor "#f4f4f5" in the site preview props
    preview: { ground: "linear-gradient(160deg, #fafafa 0%, #f0f0f1 100%)" },
    props: [
      {
        name: "items",
        type: "string",
        default: '"Monday\\nTuesday\\n…"',
        description: "Newline-separated options. The first one wins.",
      },
      { name: "wheelWidth", type: "number", default: "560", description: "Drum width in design pixels." },
      { name: "wheelHeight", type: "number", default: "280", description: "Drum height in design pixels." },
      { name: "fontSize", type: "number", default: "76", description: "Type size of each option." },
      { name: "color", type: "string", default: '"#101828"', description: "Colour of the settled option." },
      { name: "idleOpacity", type: "number", default: "0.28", description: "Opacity of the options passing by." },
      { name: "spinFrames", type: "number", default: "90", description: "How long the spin takes." },
      { name: "holdFrames", type: "number", default: "30", description: "How long the winner holds at the end." },
      { name: "bgColor", type: "string", default: '"#ffffff"', description: "Background fill." },
      { name: "designWidth", type: "number", default: "1080", description: "Reference width the layout scales from." },
    ],
  },
  {
    name: "motion-text",
    title: "Motion Text",
    description:
      "A word on a soft gradient pill that springs up into place. Five colour presets, no fonts to load.",
    tags: ["text", "title", "gradient"],
    file: "registry/remotion/motion-text/motion-text.tsx",
    dependencies: ["zod"],
    // paints no background of its own; sit it on the well token
    preview: { ground: "var(--preview-well)" },
    props: [
      { name: "text", type: "string", default: '"TEXT"', description: "The word to show." },
      { name: "color", type: "string", default: '"#022c22"', description: "Text colour over the pill." },
      {
        name: "variant",
        type: '"macha" | "ocean" | "sunset" | "midnight" | "rose"',
        default: '"macha"',
        description: "Gradient preset for the pill.",
      },
      {
        name: "animation",
        type: '"scale-up" | "none"',
        default: '"scale-up"',
        description: "Spring the word into place, or hold it still.",
      },
      { name: "fontFamily", type: "string", default: '"system-ui, sans-serif"', description: "Font stack to render with." },
    ],
  },
  {
    name: "kinetic-text",
    title: "Kinetic Text",
    description:
      "A headline that reveals word by word with spring motion, blur, and a soft accent glow.",
    tags: ["text", "intro", "spring"],
    file: "registry/remotion/kinetic-text/kinetic-text.tsx",
    dependencies: [],
    // background "#0b0b0d" with a blue accent glow
    preview: {
      ground: "linear-gradient(160deg, #16161a 0%, #0b0b0d 60%, #101a2e 100%)",
      tone: "dark",
    },
    props: [
      {
        name: "text",
        type: "string",
        default: '"Ship video like you ship UI"',
        description: "The headline, split on spaces.",
      },
      { name: "accentWord", type: "number", default: "4", description: "Index of the word that gets the accent colour." },
      { name: "accent", type: "string", default: '"#2f7cf6"', description: "Accent colour and glow." },
      { name: "background", type: "string", default: '"#0b0b0d"', description: "Background fill." },
      { name: "foreground", type: "string", default: '"#f5f5f7"', description: "Colour of the non-accent words." },
      { name: "fontFamily", type: "string", default: "system stack", description: "Font stack to render with." },
      { name: "stagger", type: "number", default: "5", description: "Frames between each word entering." },
    ],
  },
]

export function getCatalogItem(name: string) {
  return catalog.find((item) => item.name === name)
}

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
