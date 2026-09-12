"use client"

import type { ComponentType } from "react"
import {
  KineticText,
  kineticTextComposition,
  kineticTextDefaults,
} from "@/registry/remotion/kinetic-text/kinetic-text"

export type PreviewConfig = {
  component: ComponentType<Record<string, unknown>>
  inputProps: Record<string, unknown>
  durationInFrames: number
  fps: number
  width: number
  height: number
}

/** Client-side map from registry item name to a mountable Player config. */
export const previews: Record<string, PreviewConfig> = {
  "kinetic-text": {
    component: KineticText as ComponentType<Record<string, unknown>>,
    inputProps: {
      ...kineticTextDefaults,
      fontFamily:
        "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
    },
    durationInFrames: kineticTextComposition.durationInFrames,
    fps: kineticTextComposition.fps,
    width: kineticTextComposition.width,
    height: kineticTextComposition.height,
  },
}
