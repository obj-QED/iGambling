# iGambling

Casino frontend SPA: **React 19**, **Vite**, **TypeScript**, **Mantine 9**, **TanStack Query**, **Redux Toolkit**.

Architecture: **FSD** (layers) + **FDD** (feature modules). Full rules: `docs/new-project/`, `.cursor/rules/`.

## Requirements

- **Node.js** ≥ 22
- **Yarn** 4 (`corepack enable`)

## Environment

| Variable       | Purpose                                                                    |
| -------------- | -------------------------------------------------------------------------- |
| `VITE_APP_URL` | Dev proxy target for `/apiLobby.php` and `/api.php`; prod uses same-origin |

Local dev proxies API to `VITE_APP_URL`. Production build calls `api.php` on the current origin.

## Scripts

```bash
yarn install
yarn dev              # http://localhost:5173
yarn build            # production build
yarn build:analyze    # build + bundle report (dist/stats.html)
yarn preview          # preview production build
yarn typecheck        # tsc -b
yarn lint             # eslint
yarn stylelint        # scss/css
yarn test             # vitest + coverage
yarn storybook        # http://localhost:6006
yarn build-storybook  # static Storybook → storybook-static/
yarn test:a11y        # axe on Storybook (Playwright)
```

## `src/` layout (FSD)

```txt
app/          bootstrap, providers, routing, layouts (data hooks for header/menu)
pages/        route pages
widgets/      header, sidebar, banner, footer — schema-driven composition
features/     user workflows (public.ts boundary)
entities/     domain content + mapping
shared/       ui kit, config, lib, types, schemas
assets/       theme tokens (SoT), settings stub, global SCSS
api/          queries, mutations, keys
store/        Redux — auth, flags, client invariants only
stories/      Storybook stories
storybook/    Storybook decorators, fixtures, helpers (not app runtime)
```

Legacy paths (`components/`, `elements/`, `ui/`) may still exist during migration; **new code** follows FSD + `widgets/*`.

## Header Engine (v4)

Path: `src/widgets/header/`.

```txt
Schema / config → layout → block (sync) → plugin → adapter (lazy) → entity → shared/ui
```

- Menu data: `app/layouts/*` (TanStack Query) → `AppHeader` props (`menu`, `config`) only.
- Registries: `registry/layoutRegistry.ts`, `registry/blockRegistry.ts`.
- Special blocks (`search`, `logo`, `wallet`, `notification`, `color_scheme`, `bonus_box`) — dedicated UI, **no** menu `type`.
- Default menu items support optional `type`:
  - `button` or absent / `null` → variant `default`
  - `link` → variant `transparent`
- Rendering rules: icon-only → `ItemActionIcon`; text or icon+text → `ItemButton`; no `name` and no `img` → skip; broken image → `HeaderPhotoFallback` (or hide icon-only item).

Details: `.cursor/rules/header-architecture-guard.mdc`, `src/widgets/ARCHITECTURE.md`.

## Storybook

**Local:** `yarn storybook`

**Published (main branch):** [https://obj-qed.github.io/iGambling/](https://obj-qed.github.io/iGambling/)

| Section                           | Stories                                                              |
| --------------------------------- | -------------------------------------------------------------------- |
| **Elements/Button**               | `Default` (Docs preview), `All Variants`, `Playground` (Canvas only) |
| **Elements/ActionIcon**           | same pattern                                                         |
| **Widgets/Header/AppHeader**      | full shell, layout presets                                           |
| **Widgets/Header/Special Blocks** | search, wallet, color scheme                                         |
| **Widgets/Header/Menu Items**     | default item renderers (stable fixtures)                             |

Toolbar: **Header session** (authenticated / guest), **color scheme**, app settings via `src/storybook/settings/`.

Playground stories use `useArgs` and work only on the **Canvas** tab, not inside Docs embed.

Fixtures: `src/storybook/fixtures/`, `src/storybook/data/`.

## CI

On push/PR to `main`: lint, stylelint, test, build.

On push to `main`: Storybook build → **GitHub Pages** (job `storybook-pages` in `.github/workflows/ci.yml`).

## Theme

Source of truth: `src/assets/theme/theme.scss` → CSS variables → `src/assets/theme/mantine/mantineTheme.ts` (thin Mantine bridge).

CMF tokens for Button / ActionIcon: `src/assets/theme/tokens/`, `src/assets/theme/mantine/*`.

See also: `src/assets/theme/README.md`.
