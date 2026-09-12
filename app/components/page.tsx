import type { Metadata } from "next"
import { ComponentGridCard } from "@/components/site/component-grid-card"
import { catalog } from "@/components/site/catalog"

export const metadata: Metadata = {
  title: "Components",
  description:
    "Every Remotion component in the registry. Preview each one, then install it with a single shadcn command.",
  alternates: { canonical: "/components" },
}

export default function ComponentsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-10 pb-20 sm:px-8">
      <header className="flex flex-col gap-3 pb-10">
        <h1 className="text-4xl font-medium tracking-[-0.72px] sm:text-5xl">
          Components
        </h1>
        <p className="max-w-xl text-pretty text-muted">
          {catalog.length} hand-made Remotion compositions. Preview one, then copy it
          into your project with a single command.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2">
        {catalog.map((item) => (
          <ComponentGridCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
