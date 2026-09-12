"use client"

import { Button, Kbd } from "@heroui/react"
import { Icon } from "@iconify/react"

/**
 * Opens the ⌘K palette.
 *
 * A Button, not a SearchField with onFocus: the palette restores focus to its
 * trigger when it closes, so a focus handler would reopen it immediately and
 * the overlay could never be dismissed.
 */
export function SearchTrigger({
  onPress,
  className,
}: {
  onPress: () => void
  className?: string
}) {
  return (
    <Button
      aria-label="Search components"
      aria-keyshortcuts="Meta+K Control+K"
      variant="secondary"
      size="sm"
      className={`justify-start gap-2 font-normal text-muted ${className ?? ""}`}
      onPress={onPress}
    >
      <Icon icon="gravity-ui:magnifier" className="size-3.5" />
      <span className="text-xs">Search…</span>
      <Kbd className="ms-auto text-[11px]">
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>
    </Button>
  )
}
