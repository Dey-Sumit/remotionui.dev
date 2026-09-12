import fs from "node:fs"
import path from "node:path"
import { SiteNavbar } from "@/components/site/site-navbar"
import { Hero } from "@/components/site/hero"
import { ComponentCard } from "@/components/site/component-card"
import { SiteFooter } from "@/components/site/site-footer"
import { catalog } from "@/components/site/catalog"

function readSource(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), "utf8")
}

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className="flex flex-col">
        <Hero count={catalog.length} />
        <section
          id="components"
          className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 pb-20 sm:px-8"
        >
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Components</h2>
          {catalog.map((item) => (
            <ComponentCard key={item.name} item={item} source={readSource(item.file)} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
