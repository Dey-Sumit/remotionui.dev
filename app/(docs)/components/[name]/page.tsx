import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import NextLink from "next/link"
import { notFound } from "next/navigation"
import { Chip } from "@heroui/react"
import { ComponentDetail } from "@/components/site/component-detail"
import { PropsTable } from "@/components/site/props-table"
import { InstallCommand } from "@/components/site/install-command"
import { catalog, getCatalogItem, installCommand } from "@/components/site/catalog"

type Params = { params: Promise<{ name: string }> }

// Statically scoped so the build traces only registry/, not the whole project.
const REGISTRY_DIR = path.join(process.cwd(), "registry")
const registryPath = (file: string) => file.replace(/^registry\//, "")

export function generateStaticParams() {
  return catalog.map((item) => ({ name: item.name }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getCatalogItem((await params).name)
  if (!item) return {}
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/components/${item.name}` },
    openGraph: { title: item.title, description: item.description },
  }
}

export default async function ComponentPage({ params }: Params) {
  const { name } = await params
  const item = getCatalogItem(name)
  if (!item) notFound()

  const source = fs.readFileSync(path.join(REGISTRY_DIR, registryPath(item.file)), "utf8")
  const index = catalog.findIndex((c) => c.name === item.name)
  const prev = catalog[index - 1]
  const next = catalog[index + 1]

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
      <header className="flex flex-col gap-3 pb-8">
        <h1 className="text-4xl font-medium tracking-[-0.72px] sm:text-5xl">
          {item.title}
        </h1>
        <p className="text-pretty text-muted">{item.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((t) => (
            <Chip key={t} size="sm" variant="soft">
              <Chip.Label>{t}</Chip.Label>
            </Chip>
          ))}
        </div>
      </header>

      <h2 id="usage" className="pb-4 text-xl font-medium tracking-[-0.02em]">
          Usage
        </h2>
        <ComponentDetail item={item} source={source} />

      <section className="flex flex-col gap-4 pt-14">
        <h2 id="installation" className="text-xl font-medium tracking-[-0.02em]">
            Installation
          </h2>
        <InstallCommand command={installCommand(item.name)} size="sm" />
        <p className="text-sm leading-relaxed text-muted">
          Copies the composition to{" "}
          <code className="font-mono text-foreground">
            components/remotion/{item.name}.tsx
          </code>{" "}
          and installs{" "}
          <code className="font-mono text-foreground">
            {["remotion", ...item.dependencies].join(", ")}
          </code>{" "}
          if missing. No UI library required.
        </p>
      </section>

      <section className="flex flex-col gap-4 pt-14">
        <h2 id="props" className="text-xl font-medium tracking-[-0.02em]">Props</h2>
        <PropsTable props={item.props} />
      </section>

      <nav
        aria-label="Pagination"
        className="mt-16 grid gap-3 border-t border-separator pt-6 sm:grid-cols-2"
      >
        {prev ? (
          <NextLink
            href={`/components/${prev.name}`}
            className="flex flex-col gap-0.5 no-underline"
          >
            <span className="text-xs text-muted">Previous</span>
            <span className="text-sm font-medium">{prev.title}</span>
          </NextLink>
        ) : (
          <span />
        )}
        {next ? (
          <NextLink
            href={`/components/${next.name}`}
            className="flex flex-col gap-0.5 no-underline sm:items-end"
          >
            <span className="text-xs text-muted">Next</span>
            <span className="text-sm font-medium">{next.title}</span>
          </NextLink>
        ) : null}
      </nav>
    </div>
  )
}
