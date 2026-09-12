import NextLink from "next/link"
import { AmbientGradient } from "@/components/site/ambient-gradient"
import { SiteNavbar } from "@/components/site/site-navbar"
import { Hero } from "@/components/site/hero"
import { SectionHeading } from "@/components/site/section-heading"
import { ComponentGridCard } from "@/components/site/component-grid-card"
import { HowItWorks } from "@/components/site/how-it-works"
import { CtaBand } from "@/components/site/cta-band"
import { SiteFooter } from "@/components/site/site-footer"
import { catalog } from "@/components/site/catalog"

export default function Home() {
  return (
    <>
      <AmbientGradient />
      <SiteNavbar />
      <main className="flex flex-col">
        <Hero count={catalog.length} />

        <section className="mx-auto w-full max-w-5xl px-5 pb-28 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {catalog.map((item) => (
              <ComponentGridCard key={item.name} item={item} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 pt-14">
            <p className="text-sm text-muted">Built for any React project.</p>
            <NextLink
              href="/components"
              className="inline-flex h-10 items-center rounded-full bg-surface-secondary px-5 text-sm font-medium text-foreground no-underline"
            >
              Browse components
            </NextLink>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-5 pb-28 sm:px-8">
          <SectionHeading
            eyebrow="How it works"
            lead="One command."
            trail="Then it is your code."
          />
          <HowItWorks />
        </section>

        <CtaBand count={catalog.length} />
      </main>
      <SiteFooter />
    </>
  )
}
