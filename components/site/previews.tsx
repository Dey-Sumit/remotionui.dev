"use client"

import type { ComponentType } from "react"
import {
  KineticText,
  kineticTextComposition,
  kineticTextDefaults,
} from "@/registry/remotion/kinetic-text/kinetic-text"
import {
  MotionText,
  motionTextComposition,
  motionTextDefaults,
} from "@/registry/remotion/motion-text/motion-text"
import {
  TextReveal,
  textRevealComposition,
  textRevealDefaults,
} from "@/registry/remotion/text-reveal/text-reveal"
import {
  SpinningTextWheel,
  spinningTextWheelComposition,
  spinningTextWheelDefaults,
} from "@/registry/remotion/spinning-text-wheel/spinning-text-wheel"

export type PreviewConfig = {
  component: ComponentType<Record<string, unknown>>
  inputProps: Record<string, unknown>
  durationInFrames: number
  fps: number
  width: number
  height: number
}

const site =
  "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif"

/** Client-side map from registry item name to a mountable Player config. */
export const previews: Record<string, PreviewConfig> = {
  "text-reveal": {
    component: TextReveal as ComponentType<Record<string, unknown>>,
    inputProps: {
      ...textRevealDefaults,
      text: "Ship video like you ship UI",
      variant: "gradient-bg",
    },
    durationInFrames: textRevealComposition.durationInFrames,
    fps: textRevealComposition.fps,
    width: textRevealComposition.width,
    height: textRevealComposition.height,
  },
  "spinning-text-wheel": {
    component: SpinningTextWheel as ComponentType<Record<string, unknown>>,
    inputProps: {
      ...spinningTextWheelDefaults,
      items: "Remotion\nReact\nTypeScript\nTailwind\nNext.js\nVite",
      bgColor: "#f4f4f5",
    },
    durationInFrames: spinningTextWheelComposition.durationInFrames,
    fps: spinningTextWheelComposition.fps,
    width: spinningTextWheelComposition.width,
    height: spinningTextWheelComposition.height,
  },
  "motion-text": {
    component: MotionText as ComponentType<Record<string, unknown>>,
    inputProps: { ...motionTextDefaults, text: "LAUNCH", fontFamily: site },
    durationInFrames: motionTextComposition.durationInFrames,
    fps: motionTextComposition.fps,
    width: motionTextComposition.width,
    height: motionTextComposition.height,
  },
  "kinetic-text": {
    component: KineticText as ComponentType<Record<string, unknown>>,
    inputProps: { ...kineticTextDefaults, fontFamily: site },
    durationInFrames: kineticTextComposition.durationInFrames,
    fps: kineticTextComposition.fps,
    width: kineticTextComposition.width,
    height: kineticTextComposition.height,
  },
}
