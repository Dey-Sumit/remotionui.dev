import type { Metadata } from "next"
import NextLink from "next/link"
import { InstallCommand } from "@/components/site/install-command"
import { catalog, installCommand, siteConfig } from "@/components/site/catalog"

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Install a Remotion UI component into any React project with the shadcn CLI.",
  alternates: { canonical: "/getting-started" },
}

export default function GettingStartedPage() {
  const first = catalog[0]

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
      <header className="flex flex-col gap-3 pb-10">
        <h1 className="text-4xl font-medium tracking-[-0.72px] sm:text-5xl">
          Getting Started
        </h1>
        <p className="text-pretty text-muted">
          {siteConfig.name} is a shadcn-compatible registry. There is nothing to
          install up front — each component is copied into your project on demand.
        </p>
      </header>

      <section className="flex flex-col gap-4 pb-12">
        <h2 id="requirements" className="text-xl font-medium tracking-[-0.02em]">
          Requirements
        </h2>
        <ul className="flex list-disc flex-col gap-2 ps-5 text-sm leading-relaxed text-muted">
          <li>A React project with Remotion set up.</li>
          <li>
            A <code className="font-mono text-foreground">components.json</code> at the
            project root, so the shadcn CLI knows where to write files. Run{" "}
            <code className="font-mono text-foreground">npx shadcn@latest init</code> if
            you do not have one.
          </li>
          <li>No UI library. Components ship plain Remotion and inline styles.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4 pb-12">
        <h2 id="install" className="text-xl font-medium tracking-[-0.02em]">
          Install a component
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          Every item has its own registry URL. Pass it to the shadcn CLI:
        </p>
        <InstallCommand command={installCommand(first.name)} size="sm" />
        <p className="text-sm leading-relaxed text-muted">
          That writes{" "}
          <code className="font-mono text-foreground">
            components/remotion/{first.name}.tsx
          </code>{" "}
          and installs <code className="font-mono text-foreground">remotion</code> if it
          is missing. The file is yours from that point — edit the springs, the colours,
          the timing.
        </p>
      </section>

      <section className="flex flex-col gap-4 pb-12">
        <h2 id="use" className="text-xl font-medium tracking-[-0.02em]">
          Use it
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          Each component exports the composition plus a typed{" "}
          <code className="font-mono text-foreground">defaultProps</code> and the
          recommended{" "}
          <code className="font-mono text-foreground">
            durationInFrames, fps, width, height
          </code>
          , so registering it takes one line.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 id="next" className="text-xl font-medium tracking-[-0.02em]">
          Next
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          Browse the{" "}
          <NextLink href="/components" className="text-accent">
            {catalog.length} components
          </NextLink>
          , preview each one, and copy the command from its page.
        </p>
      </section>
    </div>
  )
}
