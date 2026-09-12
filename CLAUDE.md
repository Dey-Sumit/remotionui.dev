# Remotion UI

A shadcn-compatible component registry that distributes hand-made, curated
**Remotion** video components. People install them into their own projects
with `npx shadcn@latest add <url>/r/<name>.json`. The site at remotionui.dev
is the catalog and live preview for those components.

## The two layers (read this first)

| Layer | Lives in | Design system | Rule |
| --- | --- | --- | --- |
| **Site** (catalog, previews, docs) | `app/`, `components/` | **HeroUI + HeroUI Pro, end to end** | Never use shadcn components or shadcn tokens here. |
| **Registry items** (what users install) | `registry/` | **Plain Remotion. No UI library.** | Only `remotion` and Remotion packages as deps. Inline styles or plain Tailwind classes. Must work in any React project. |

The site is a HeroUI app. The products it ships are UI-library-agnostic
Remotion compositions. Do not blur these.

## Design system: HeroUI only

- Base components come from `@heroui/react`, Pro components from `@heroui-pro/react`.
- Styles: `app/globals.css` imports, in order, `tailwindcss`, `@heroui/styles`,
  `@heroui-pro/react/css`. Do not reintroduce a shadcn `@theme` token block.
- Use HeroUI semantic tokens only: `bg-background`, `bg-surface`, `text-foreground`,
  `text-muted`, `bg-accent`, `border-border`, `border-separator`, `shadow-surface`.
  No `bg-card`, `text-muted-foreground`, `bg-primary`, `text-destructive`.
- Theme: the HeroUI Pro **glass** preset exported from the theme dashboard. `DESIGN.md`
  (tokens, typography, do's and don'ts) and `PRODUCT.md` at the repo root are the source
  of truth; the CSS overrides live in `app/globals.css`. Font is Inter.
- Dark mode: `<html>` carries `glass-dark` + `dark`, light carries `glass-light`.
  `components/site/theme-toggle.tsx` owns this. Do not use bare `.dark` alone.
- Icons: `@iconify/react` with the `gravity-ui` set. Not lucide.
- Compound components use dot notation (`Card.Header`, `Navbar.Item`). `onPress`, not `onClick`.
- Before writing HeroUI code, load the `heroui-react-pro` skill and the
  `heroui-pro-design-taste` skill. Use the `heroui-pro` MCP (`list_components`,
  `get_component_docs`) to confirm a component exists and read its API. Never guess
  component names.

## Registry plumbing: do not remove

These files make distribution work. Edit them to add items; never delete or
"clean up" them because they look like shadcn leftovers.

- `registry.json` — the source of truth for every item.
- `public/r/*.json` — generated output. Regenerate with `pnpm registry:build`. Do not hand-edit.
- `components.json` — required by the shadcn CLI for `registry:build` and for installing
  third-party shadcn items into this app.
- `lib/utils.ts` (`cn`) — third-party shadcn items import `@/lib/utils`.
- `shadcn`, `clsx`, `tailwind-merge` in `package.json`.

## Adding a curated component

1. Load the `remotion-best-practices` skill (router) and follow `remotion-create`
   and `remotion-markup` for the composition itself.
2. Create `registry/remotion/<name>/<name>.tsx`. Export the composition component
   plus a typed `defaultProps` and the recommended `durationInFrames`, `fps`,
   `width`, `height` so the site can mount it in `@remotion/player`.
3. Add an item to `registry.json` with `type: "registry:component"`,
   `dependencies: ["remotion"]` (plus other Remotion packages if used), and
   the file path. No `registryDependencies` on shadcn primitives.
4. Register the item in the site catalog (`components/site/catalog.ts`) so it gets
   a preview card.
5. Run `pnpm registry:build`, then `pnpm build`. Both must pass.

## Third-party shadcn components in the site

Allowed as an exception when a needed piece has no HeroUI equivalent. They install
into `components/ui/` via the shadcn CLI. Treat that folder as quarantine: nothing
in `components/site/` should import from it unless there is no HeroUI option.
Expect token mismatches (`bg-card`, `text-muted-foreground`, `bg-primary` do not
exist in HeroUI). Map only the tokens that component needs inside its own file.

## Commands

```
pnpm dev              # next dev --turbopack
pnpm build            # next build (typechecks)
pnpm lint
pnpm registry:build   # shadcn build -> public/r/*.json
```

## Stack facts

- Next.js 15 App Router, React 19, Tailwind CSS v4, pnpm.
- `@heroui/react` 3.x, `@heroui-pro/react` 1.0 beta. Pro needs `HEROUI_AUTH_TOKEN`
  in CI for `pnpm install`.
- `pnpm-workspace.yaml` allowlists the Pro postinstall scripts. Keep it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
