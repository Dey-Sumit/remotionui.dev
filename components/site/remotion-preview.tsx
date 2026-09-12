"use client"

import { Player } from "@remotion/player"
import type { PreviewConfig } from "@/components/site/previews"

export function RemotionPreview({ config }: { config: PreviewConfig }) {
  return (
    <Player
      component={config.component}
      inputProps={config.inputProps}
      durationInFrames={config.durationInFrames}
      compositionWidth={config.width}
      compositionHeight={config.height}
      fps={config.fps}
      controls
      loop
      autoPlay
      initiallyMuted
      acknowledgeRemotionLicense
      style={{ width: "100%", aspectRatio: `${config.width} / ${config.height}` }}
      className="rounded-xl"
    />
  )
}
