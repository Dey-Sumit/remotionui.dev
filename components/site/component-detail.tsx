"use client"

import dynamic from "next/dynamic"
import { Skeleton, Tabs } from "@heroui/react"
import { previews } from "@/components/site/previews"
import type { CatalogItem } from "@/components/site/catalog"

const RemotionPreview = dynamic(
  () => import("@/components/site/remotion-preview").then((m) => m.RemotionPreview),
  { ssr: false, loading: () => <Skeleton className="aspect-video w-full rounded-xl" /> }
)
const CodeView = dynamic(() => import("@/components/site/code-view"), {
  loading: () => <Skeleton className="h-80 w-full rounded-xl" />,
})

/** Docs-style preview/code switch. The player stays small on purpose. */
export function ComponentDetail({
  item,
  source,
}: {
  item: CatalogItem
  source: string
}) {
  const preview = previews[item.name]

  return (
    <Tabs defaultSelectedKey="preview" className="w-full">
      <Tabs.ListContainer className="w-fit max-w-full">
        <Tabs.List aria-label={`${item.title} views`}>
          <Tabs.Tab id="preview">
            Preview
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="code">
            Code
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="preview" className="pt-4">
        {preview ? (
          <div className="overflow-hidden rounded-[24px] bg-surface p-1 shadow-surface">
            <div
              className="overflow-hidden rounded-[20px]"
              style={{ background: item.preview.ground }}
            >
              <RemotionPreview config={preview} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">No preview registered.</p>
        )}
      </Tabs.Panel>
      <Tabs.Panel id="code" className="pt-4">
        <CodeView code={source} fileName={item.file.split("/").pop() ?? item.file} />
      </Tabs.Panel>
    </Tabs>
  )
}
