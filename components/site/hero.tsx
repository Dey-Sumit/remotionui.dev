"use client"

import { useRouter } from "next/navigation"
import { Button } from "@heroui/react"
import { Icon } from "@iconify/react"
import { siteConfig } from "@/components/site/catalog"

export function Hero({ count }: { count: number }) {
  const router = useRouter()

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
      <p className="text-sm font-medium text-accent">
        {count} components, and counting
      </p>
      <h1 className="w-full text-center text-5xl font-medium leading-[0.9] tracking-[-1.08px] sm:text-6xl md:text-7xl">
        <span className="block">Ship video</span>
        <span className="block text-muted/70">like you ship UI</span>
      </h1>
      <p className="max-w-xl text-pretty text-center text-base text-muted sm:text-lg">
        Hand-made Remotion components, distributed as a shadcn registry. Plain
        Remotion, no UI library, yours to edit once installed.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Button onPress={() => router.push("/components")}>Browse components</Button>
        <Button
          variant="outline"
          onPress={() => window.open(siteConfig.github, "_blank", "noreferrer")}
        >
          <Icon icon="gravity-ui:logo-github" className="size-4" />
          GitHub
        </Button>
      </div>
    </section>
  )
}
