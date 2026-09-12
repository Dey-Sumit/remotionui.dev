"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import type { PlayerRef } from "@remotion/player"
import { Segment } from "@heroui-pro/react"
import { Button, Separator, Skeleton, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { previews } from "@/components/site/previews"
import type { PreviewAspect } from "@/components/site/remotion-preview"
import type { CatalogItem } from "@/components/site/catalog"

const RemotionPreview = dynamic(
  () => import("@/components/site/remotion-preview").then((m) => m.RemotionPreview),
  { ssr: false, loading: () => <Skeleton className="aspect-video w-full rounded-xl" /> }
)
const CodeView = dynamic(() => import("@/components/site/code-view"), {
  loading: () => <Skeleton className="h-80 w-full rounded-xl" />,
})

const ASPECTS: { id: PreviewAspect; label: string }[] = [
  { id: "16:9", label: "16:9" },
  { id: "9:16", label: "9:16" },
  { id: "1:1", label: "1:1" },
]

/**
 * Demo block: a small chrome bar over a large inset stage.
 *
 * The aspect switcher stands in for the viewport switcher a component library
 * would show — width means nothing to a video, but the canvas it renders into
 * is the real question for a composition.
 */
export function ComponentDetail({
  item,
  source,
}: {
  item: CatalogItem
  source: string
}) {
  const preview = previews[item.name]
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [aspect, setAspect] = React.useState<PreviewAspect>("16:9")
  const player = React.useRef<PlayerRef>(null)

  function replay() {
    player.current?.seekTo(0)
    player.current?.play()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segment
          size="sm"
          selectedKey={view}
          onSelectionChange={(key) => setView(key as "preview" | "code")}
        >
          <Segment.Item id="preview">
            <Icon icon="gravity-ui:eye" className="size-3.5" />
            Preview
          </Segment.Item>
          <Segment.Item id="code">
            <Icon icon="gravity-ui:code" className="size-3.5" />
            Code
          </Segment.Item>
        </Segment>

        {view === "preview" && preview ? (
          <div className="flex items-center gap-2">
            <Tooltip delay={300}>
              <Button
                aria-label="Replay"
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={replay}
              >
                <Icon icon="gravity-ui:arrow-rotate-left" className="size-3.5" />
              </Button>
              <Tooltip.Content>Replay</Tooltip.Content>
            </Tooltip>
            <Separator orientation="vertical" className="h-5" />
            <Segment
              size="sm"
              selectedKey={aspect}
              onSelectionChange={(key) => setAspect(key as PreviewAspect)}
            >
              {ASPECTS.map((a) => (
                <Segment.Item key={a.id} id={a.id}>
                  {a.label}
                </Segment.Item>
              ))}
            </Segment>
          </div>
        ) : null}
      </div>

      {view === "preview" ? (
        preview ? (
          <div className="flex justify-center rounded-[24px] bg-surface p-2 shadow-surface">
            <div
              className="w-full overflow-hidden rounded-[18px]"
              style={{
                background: item.preview.ground,
                maxWidth: aspect === "16:9" ? "100%" : "18rem",
              }}
            >
              <RemotionPreview config={preview} aspect={aspect} playerRef={player} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">No preview registered.</p>
        )
      ) : (
        <CodeView code={source} fileName={item.file.split("/").pop() ?? item.file} />
      )}
    </div>
  )
}
