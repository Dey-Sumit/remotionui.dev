import type { Metadata } from "next"
import { ThemeShowcase } from "@/components/site/theme-showcase"

export const metadata: Metadata = {
  title: "Theme",
  description: "HeroUI glass theme showcase for Remotion UI.",
  robots: { index: false, follow: false },
}

export default function ThemePage() {
  return <ThemeShowcase />
}
