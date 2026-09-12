import NextLink from "next/link"
import { RemotionUIMark } from "@/components/site/mark"
import { catalog, siteConfig } from "@/components/site/catalog"

const resources = [
  { href: "/components", label: "All components", external: false },
  { href: siteConfig.github, label: "GitHub", external: true },
  { href: "https://www.remotion.dev", label: "Remotion", external: true },
]

function FooterLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  const className =
    "text-sm text-muted no-underline transition-none hover:text-foreground"
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <NextLink className={className} href={href}>
      {children}
    </NextLink>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-separator">
      <div className="mx-auto w-full max-w-5xl px-5 pt-14 pb-10 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <RemotionUIMark className="size-5" />
              <span className="font-semibold tracking-[-0.01em]">{siteConfig.name}</span>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-muted">
              Hand-made Remotion video components, distributed as a shadcn-compatible
              registry.
            </p>
          </div>

          <nav aria-label="Components" className="flex flex-col items-start gap-3">
            <h2 className="text-sm font-semibold tracking-[-0.01em]">Components</h2>
            {catalog.map((item) => (
              <FooterLink key={item.name} href={`/components/${item.name}`}>
                {item.title}
              </FooterLink>
            ))}
          </nav>

          <nav aria-label="Resources" className="flex flex-col items-start gap-3">
            <h2 className="text-sm font-semibold tracking-[-0.01em]">Resources</h2>
            {resources.map((r) => (
              <FooterLink key={r.label} href={r.href} external={r.external}>
                {r.label}
              </FooterLink>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-separator pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Built with Remotion and HeroUI.</p>
        </div>
      </div>
    </footer>
  )
}
