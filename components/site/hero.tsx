"use client"

import { Chip } from "@heroui/react"
import { InstallCommand } from "@/components/site/install-command"
import { installCommand, siteConfig } from "@/components/site/catalog"

export function Hero({ count }: { count: number }) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
      <Chip color="accent" variant="soft" size="sm">
        <Chip.Label>
          {count} {count === 1 ? "component" : "components"} · shadcn registry
        </Chip.Label>
      </Chip>
      <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
        {siteConfig.tagline}
      </h1>
      <p className="max-w-2xl text-pretty text-base text-muted sm:text-lg">
        {siteConfig.description}
      </p>
      <div className="w-full max-w-2xl pt-2">
        <InstallCommand command={installCommand("kinetic-text")} />
      </div>
    </section>
  )
}
