"use client"

import * as React from "react"
import { Button, Tooltip } from "@heroui/react"
import { Icon } from "@iconify/react"

export function CopyButton({
  value,
  label = "Copy",
  size = "sm",
}: {
  value: string
  label?: string
  size?: "sm" | "md"
}) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  async function onPress() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Tooltip delay={300}>
      <Button
        aria-label={copied ? "Copied" : label}
        isIconOnly
        size={size}
        variant="ghost"
        onPress={onPress}
      >
        <Icon
          icon={copied ? "gravity-ui:check" : "gravity-ui:copy"}
          className={copied ? "size-4 text-success" : "size-4"}
        />
      </Button>
      <Tooltip.Content>{copied ? "Copied" : label}</Tooltip.Content>
    </Tooltip>
  )
}
