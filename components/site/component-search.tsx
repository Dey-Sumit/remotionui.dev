"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "@heroui-pro/react"
import { Kbd } from "@heroui/react"
import { Icon } from "@iconify/react"
import { catalog } from "@/components/site/catalog"

/**
 * ⌘K palette over the catalog. The trigger is rendered by the caller so the
 * navbar can style it as a search field on desktop and an icon on mobile.
 */
export function ComponentSearch({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  return (
    <Command>
      <Command.Backdrop variant="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <Command.Container>
          <Command.Dialog>
            <Command.InputGroup>
              <Command.InputGroup.Prefix>
                <Icon icon="gravity-ui:magnifier" className="size-4" />
              </Command.InputGroup.Prefix>
              <Command.InputGroup.Input placeholder="Search components…" />
              <Command.InputGroup.ClearButton />
              <Command.InputGroup.Suffix>
                <Kbd className="text-xs">
                  <Kbd.Content>Esc</Kbd.Content>
                </Kbd>
              </Command.InputGroup.Suffix>
            </Command.InputGroup>
            <Command.List
              renderEmptyState={() => (
                <div className="flex h-20 items-center justify-center text-sm text-muted">
                  No components match.
                </div>
              )}
              onAction={(key) => {
                onOpenChange(false)
                router.push(String(key))
              }}
            >
              <Command.Group heading="Components">
                {catalog.map((item) => (
                  <Command.Item
                    key={item.name}
                    id={`/components/${item.name}`}
                    textValue={`${item.title} ${item.tags.join(" ")}`}
                  >
                    <span>{item.title}</span>
                    <span className="ms-auto truncate text-xs text-muted">
                      {item.tags.join(" · ")}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Pages">
                <Command.Item id="/components" textValue="Browse all components">
                  <span>Browse all components</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Dialog>
        </Command.Container>
      </Command.Backdrop>
    </Command>
  )
}

/** Toggles the palette on ⌘K / Ctrl+K, so the same chord closes it again. */
export function useSearchHotkey(onToggle: () => void) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onToggle()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onToggle])
}
