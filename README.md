# Remotion UI

**Curated Remotion components, installed with one command.**

Remotion UI is a [shadcn-compatible registry](https://ui.shadcn.com/docs/registry) of
hand-made [Remotion](https://www.remotion.dev) video components. Every component is
plain Remotion: no UI library, no design-system lock-in. Install one into any React
project and the source lands in your codebase, yours to edit.

Live: **https://remotionui.dev**

## Install a component

```sh
npx shadcn@latest add https://remotionui.dev/r/kinetic-text.json
```

The shadcn CLI copies the component into `components/remotion/` and adds `remotion`
to your dependencies if it is missing. Works with `pnpm dlx`, `bunx`, and `yarn dlx` too.

Browse everything at https://remotionui.dev or read the raw index at
https://remotionui.dev/r/registry.json.

### Requirements

- React 18 or 19
- Remotion 4.x
- Any bundler the shadcn CLI supports (Next.js, Vite, Remix, and others)

The `shadcn` CLI needs a `components.json` in your project. If you do not have one,
run `npx shadcn@latest init` first.

## Components

| Name | Description |
| --- | --- |
| `kinetic-text` | A headline that reveals word by word with spring motion, blur, and a soft accent glow. |

More are on the way. Each one is designed by hand, not generated.

## Run the site locally

```sh
pnpm install
pnpm dev
```

The site uses [HeroUI](https://heroui.com) and HeroUI Pro. Installing `@heroui-pro/react`
requires a HeroUI Pro licence: run `npx heroui-pro login` once locally, or set the
`HEROUI_AUTH_TOKEN` environment variable in CI (create a CI/CD token in the
[HeroUI dashboard](https://heroui.pro/dashboard)).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_BASE_URL` if you are hosting
the registry somewhere other than remotionui.dev.

## Add a component (contributors)

1. Create `registry/remotion/<name>/<name>.tsx`. Use only `remotion` and Remotion
   packages. Export the component, a typed `defaults` object, and the recommended
   composition metadata (`width`, `height`, `fps`, `durationInFrames`).
2. Add an entry to `registry.json`.
3. Register a preview in `components/site/catalog.ts` and `components/site/previews.tsx`.
4. Run `pnpm registry:build` to regenerate `public/r/`, then `pnpm build`.

See `CLAUDE.md` for the full conventions.

## How distribution works

There is no npm package to publish. The registry is a set of static JSON files under
`public/r/`, generated from `registry.json` by `shadcn build` and served by the site.
The shadcn CLI downloads the JSON, writes the files into the user's project, and
installs the listed npm dependencies. Deploying the site is deploying the registry.

## License

[MIT](./LICENSE). Components you install are yours to modify and ship.
