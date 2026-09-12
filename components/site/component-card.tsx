"use client"

import dynamic from "next/dynamic"
import { Card, Chip, Skeleton, Tabs } from "@heroui/react"
import { InstallCommand } from "@/components/site/install-command"
import { previews } from "@/components/site/previews"
import { installCommand, type CatalogItem } from "@/components/site/catalog"

// Heavy client-only pieces (Remotion Player, shiki highlighter) load on demand
// so the static HTML and first bundle stay small.
const RemotionPreview = dynamic(
  () => import("@/components/site/remotion-preview").then((m) => m.RemotionPreview),
  { ssr: false, loading: () => <Skeleton className="aspect-video w-full rounded-xl" /> }
)
const CodeView = dynamic(() => import("@/components/site/code-view"), {
  loading: () => <Skeleton className="h-64 w-full rounded-xl" />,
})

export function ComponentCard({
  item,
  source,
}: {
  item: CatalogItem
  source: string
}) {
  const preview = previews[item.name]
  const command = installCommand(item.name)

  return (
    <Card id={item.name} className="scroll-mt-24 gap-0 p-0">
      <Card.Header className="flex flex-col gap-3 p-6 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <Card.Title className="text-lg">{item.title}</Card.Title>
          <Card.Description className="text-pretty">
            {item.description}
          </Card.Description>
        </div>
        <div className="flex shrink-0 flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <Chip key={t} size="sm" variant="soft">
              <Chip.Label>{t}</Chip.Label>
            </Chip>
          ))}
        </div>
      </Card.Header>
      <Card.Content className="p-6 pt-0">
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
              <Tabs.Tab id="install">
                Install
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="preview" className="pt-4">
            {preview ? (
              <div className="overflow-hidden rounded-xl">
                <RemotionPreview config={preview} />
              </div>
            ) : (
              <p className="text-sm text-muted">No preview registered.</p>
            )}
          </Tabs.Panel>
          <Tabs.Panel id="code" className="pt-4">
            <CodeView code={source} fileName={item.file.split("/").pop() ?? item.file} />
          </Tabs.Panel>
          <Tabs.Panel id="install" className="flex flex-col gap-4 pt-4">
            <InstallCommand command={command} size="sm" />
            <p className="text-sm text-muted">
              Installs to <code className="font-mono">components/remotion/{item.name}.tsx</code>{" "}
              and adds <code className="font-mono">remotion</code> if missing. No UI
              library required.
            </p>
          </Tabs.Panel>
        </Tabs>
      </Card.Content>
    </Card>
  )
}
