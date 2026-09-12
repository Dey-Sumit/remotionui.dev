"use client"

import * as React from "react"
import { Player, type PlayerRef } from "@remotion/player"
import type { PreviewConfig } from "@/components/site/previews"

export type PreviewAspect = "16:9" | "9:16" | "1:1"

/** Canvas per aspect. The compositions centre their content, so they reflow
 *  rather than crop when the canvas changes shape. */
const CANVAS: Record<PreviewAspect, { width: number; height: number }> = {
  "16:9": { width: 1920, height: 1080 },
  "9:16": { width: 1080, height: 1920 },
  "1:1": { width: 1080, height: 1080 },
}

/**
 * Render at the composition's own dimensions whenever the requested aspect is
 * the shape it was authored for, and at a standard canvas otherwise.
 *
 * Without this the table wins unconditionally, so the first composition
 * authored at anything but 1920x1080 would silently render at 1920x1080 while
 * the control claimed otherwise.
 */
function canvasFor(config: PreviewConfig, aspect: PreviewAspect) {
  const target = CANVAS[aspect]
  const isNativeShape =
    Math.abs(config.width / config.height - target.width / target.height) < 0.01
  return isNativeShape ? { width: config.width, height: config.height } : target
}

export function RemotionPreview({
  config,
  controls = true,
  aspect = "16:9",
  playerRef,
}: {
  config: PreviewConfig
  controls?: boolean
  aspect?: PreviewAspect
  playerRef?: React.Ref<PlayerRef>
}) {
  const canvas = canvasFor(config, aspect)

  return (
    <Player
      ref={playerRef}
      component={config.component}
      inputProps={config.inputProps}
      durationInFrames={config.durationInFrames}
      compositionWidth={canvas.width}
      compositionHeight={canvas.height}
      fps={config.fps}
      controls={controls}
      loop
      autoPlay
      initiallyMuted
      acknowledgeRemotionLicense
      style={{ width: "100%", aspectRatio: `${canvas.width} / ${canvas.height}` }}
    />
  )
}
