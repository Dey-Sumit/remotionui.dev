"use client"

import { Surface } from "@heroui/react"
import { CopyButton } from "@/components/site/copy-button"

export function InstallCommand({
  command,
  size = "md",
}: {
  command: string
  size?: "sm" | "md"
}) {
  return (
    <Surface
      variant="secondary"
      className={
        size === "md"
          ? "flex min-w-0 items-center gap-3 rounded-2xl pl-4 pr-2 py-2 font-mono text-[0.9375rem]"
          : "flex min-w-0 items-center gap-2 rounded-xl pl-3 pr-1 py-1 font-mono text-[0.8125rem]"
      }
    >
      <span aria-hidden className="select-none text-muted">
        $
      </span>
      <code className="min-w-0 flex-1 truncate text-foreground">{command}</code>
      <CopyButton value={command} label="Copy install command" size="sm" />
    </Surface>
  )
}
