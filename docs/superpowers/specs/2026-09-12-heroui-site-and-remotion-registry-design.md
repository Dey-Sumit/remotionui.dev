# Remotion UI: HeroUI site + plain-Remotion registry

Date: 2026-09-12. Status: approved in chat, implementing.

## Goal

Turn the stock shadcn `registry-template` into Remotion UI: a shadcn-compatible
registry of curated Remotion components, with a catalog site built end to end on
HeroUI and HeroUI Pro.

## Decisions (from the owner)

1. Registry items are plain Remotion. No UI library dependency. Installable anywhere.
2. Delete the four demo items and the shadcn `ui/` copies. Ship one real Remotion
   starter component, built with the Remotion skills.
3. Rebuild `components/site/` from scratch on HeroUI. Discard the earlier attempt.
4. `heroui-pro` MCP registered at user scope.

## Non-goals

- No multi-page docs site. One page.
- No auth, search, or CMS.
- No token shims for future third-party shadcn installs.

## Architecture

```
app/layout.tsx            HeroUI styles, fonts, metadata, theme class
app/page.tsx              composes site sections
app/globals.css           tailwindcss -> @heroui/styles -> @heroui-pro/react/css -> fonts
components/site/          HeroUI-only site chrome
  catalog.ts              list of registry items shown on the site (name, title, tags, player config)
  site-navbar.tsx         Pro Navbar
  hero.tsx                title, pitch, InstallCommand
  install-command.tsx     Surface + code + CopyButton
  copy-button.tsx         Button + Tooltip, clipboard
  component-card.tsx      Card + Tabs(Preview | Code | Install) + Chips
  remotion-preview.tsx    "use client" @remotion/player wrapper
  site-footer.tsx         Separator + Links
  theme-toggle.tsx        "use client" .dark toggle, localStorage
registry/remotion/<name>/<name>.tsx    plain Remotion compositions
registry.json, public/r/, components.json, lib/utils.ts   unchanged plumbing
```

## Dependencies

Remove: `@radix-ui/react-label`, `@radix-ui/react-slot`, `class-variance-authority`,
`tw-animate-css` (HeroUI styles already import it), `lucide-react`, `zod`.
Add: `remotion`, `@remotion/player`, `@iconify/react`.
Keep: `shadcn`, `clsx`, `tailwind-merge`, all HeroUI packages.

## First registry item: `kinetic-text`

A headline that reveals word by word with spring-driven translate + opacity,
then holds. Props: `text`, `accent` colour, `fontFamily`. 1920x1080, 30 fps,
90 frames. Only `remotion` as a dependency. Uses `useCurrentFrame`,
`useVideoConfig`, `spring`, `interpolate`, `AbsoluteFill`.

## Site behaviour

- Light and dark via `.dark` on `<html>`; toggle persists to localStorage; no
  flash: an inline script applies the stored class before hydration.
- Each catalog card mounts the composition in `@remotion/player` with controls,
  loop, autoplay on hover/visible. Code tab shows the source via a `CodeBlock`
  (Pro). Install tab shows the `npx shadcn@latest add` command.
- `NEXT_PUBLIC_BASE_URL` drives the install URL; falls back to
  `https://remotionui.dev`.

## Verification

`pnpm registry:build`, `pnpm lint`, `pnpm build` pass. Screenshots at 1440 and
390 px wide, light and dark, no horizontal scroll.
