import NextLink from "next/link"
import { SectionHeading } from "@/components/site/section-heading"

export function CtaBand({ count }: { count: number }) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-5 pb-32 sm:px-8">
      <SectionHeading
        lead={`${count} components, no design system.`}
        trail="Nothing to theme around."
      />
      <NextLink
        href="/components"
        className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background no-underline"
      >
        Browse components
      </NextLink>
    </section>
  )
}
