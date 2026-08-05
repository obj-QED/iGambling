# iGambling

Casino frontend SPA — schema-driven shell (header / sidebar / banner / footer) on a PHP backend API.

Built for long-term scale: strict layers, registry-based UI, token-driven theme, no duplicated mobile/desktop trees.

---

## Stack

| Area         | Choice                                                    |
| ------------ | --------------------------------------------------------- |
| UI           | React **19** · TypeScript · Mantine **9** · SCSS Modules  |
| Build        | Vite · Yarn **4** · Node **≥ 22**                         |
| Server state | TanStack Query                                            |
| Client state | Redux Toolkit (auth / session / flags only)               |
| Routing      | React Router 6                                            |
| Quality      | ESLint · Stylelint · Vitest · Storybook · Playwright a11y |

Architecture: **FSD** (layers) + **FDD** (feature boundaries via `public.ts`).

---

## Quick start

```bash
corepack enable
yarn install

# Local env only (gitignored) — never commit secrets
# Create .env.local and set VITE_APP_URL to your API origin (no trailing slash)

yarn dev                        # http://localhost:5173
```

| Command                        | What it does                               |
| ------------------------------ | ------------------------------------------ |
| `yarn dev`                     | Vite dev server + API proxy                |
| `yarn build`                   | Typecheck + production bundle → `dist/`    |
| `yarn preview`                 | Serve the production build                 |
| `yarn typecheck`               | `tsc -b`                                   |
| `yarn lint` / `yarn stylelint` | JS/TS and SCSS lint                        |
| `yarn test`                    | Vitest + coverage (`test/` mirrors `src/`) |
| `yarn storybook`               | Component lab → http://localhost:6006      |
| `yarn build:analyze`           | Bundle report → `dist/stats.html`          |

---

## Environment

Create **`.env.local`** for development (gitignored). Inject production values in CI — not in the repo.

| Variable               | Scope        | Purpose                                                                         |
| ---------------------- | ------------ | ------------------------------------------------------------------------------- |
| `VITE_APP_URL`         | Dev / build  | API origin for Vite proxy and asset URLs. Prod often same-origin → leave empty. |
| `VITE_LOBBY_API_URL`   | Dev fallback | Proxy target if `VITE_APP_URL` is empty                                         |
| `VITE_DEV_LOBBY_TOKEN` | **Dev only** | Seeds in-memory lobby token for `initV2` / `getPage`                            |

**Dev proxy:** `/apiLobby.php` and `/api.php` → `{VITE_APP_URL}`.  
**Production:** same-origin API on the deployed host.

> `VITE_*` values are inlined into the **browser bundle**. Never store private keys or session secrets there.

---

## Project layout

```txt
src/
├── app/           bootstrap, providers, routing, layouts (menu fetch)
├── pages/         route pages
├── widgets/       header · sidebar · banner · footer
├── features/      user workflows (public.ts boundary)
├── entities/      domain content + mapping
├── elements/      AppButton, AppActionIcon — Mantine wrappers
├── shared/        ui kit, config, lib, schemas, types
├── api/           axios clients, queries, mutations, keys
├── store/         Redux — auth / flags only (no API cache)
├── assets/        theme tokens (SoT), settings stub, global SCSS
├── stories/       Storybook stories
└── storybook/     Storybook helpers (not app runtime)

test/              Vitest suites — mirror of src/ (not colocated)
```

**Import rule:** only downward  
`app → pages → widgets → features → entities → elements / shared`

Cross-feature / cross-widget imports only through `public.ts` (or `index.ts`).

---

## Component architecture

### Layer roles

| Layer       | Responsibility                                           | Must not                           |
| ----------- | -------------------------------------------------------- | ---------------------------------- |
| `app/`      | Providers, routes, layout data hooks                     | Widget internals, business UI      |
| `pages/`    | Route composition                                        | Heavy logic, API calls             |
| `widgets/`  | Shell composition (header, aside, …)                     | `useQuery`, Redux for server cache |
| `features/` | User actions / workflows                                 | Cross-feature deep imports         |
| `entities/` | Domain content + mapping                                 | Layout / overlays / variants       |
| `elements/` | Thin Mantine wrappers (`AppButton`, `AppActionIcon`)     | Business rules                     |
| `shared/`   | Primitives (`AppLink`, `CmfIcon`, overlays), lib, config | Domain knowledge                   |

### Shared vs widget

| Put in **shared** / **elements**   | Put in **widget**                      |
| ---------------------------------- | -------------------------------------- |
| Used in ≥2 places or generic infra | Menu orchestration, registries, config |
| Zero menu/domain knowledge         | Knows menu keys, blocks, layout shell  |
| Props in → JSX out                 | Receives `menu` + `config` via props   |

Examples:

- **`AppLink`** — internal `Link` / external `<a>` / invalid `<span>` via `getAppHrefKind`
- **`CmfIcon`** — SVG / raster media for Button & ActionIcon sections
- **`AppButton` / `AppActionIcon`** — Mantine controls + CMF classNames bridge
- **Header / Sidebar blocks** — sync routers from `BLOCK_REGISTRY`

### Module contract

Every feature / widget exports only through **`public.ts`**:

```txt
widgets/header/
├── public.ts          ← external import surface
├── config/            resolveHeaderConfig (no React)
├── registry/          layout + block maps (sync)
├── ui/                dumb renderers
├── lib/               pure helpers
└── types/
```

UI files stay dumb: props in, JSX out. Props types live in `types/`, not inline in `.tsx`.

### Registries over conditionals

```txt
item.key  →  BLOCK_REGISTRY[key]  →  Block component
config.type → TYPE_STRATEGY_REGISTRY[type]
```

Forbidden in JSX:

- `if (isMobile)` / duplicated desktop+mobile trees
- `switch (variant)` for choosing UI
- `useQuery` / `useMutation` inside `ui/`

Structural responsive → CSS (`flex`, `order`, `[data-layout]`).  
Behavioral responsive → different block / adapter via **schema config**.

### Widget pipelines

**Header** (`src/widgets/header/`):

```txt
__SETTINGS__.header + init menu
  → resolveHeaderConfig
  → type strategy + layout registry
  → section → block registry (sync)
  → AppButton / AppActionIcon / Dropdown
  → shared/ui
```

- Fetch only in `app/layouts/*` → header gets `{ menu, config }`
- Special blocks: `search`, `logo`, `wallet`, `notification`, `color_scheme`, `bonus_box`

**Sidebar** (`src/widgets/sidebar/`):

```txt
__SETTINGS__.aside + menu
  → resolveSidebarConfig
  → type strategy → shell → section → block registry
  → menu rows (CmfIcon, AppLink, dropdowns)
```

Special keys: `aside_header_logo`, `search_leftmenu`, `timer`, `wheel_mdl`.

**Settings:** `src/assets/settings/` → `dist/settings.js` → `window.__SETTINGS__` (server may override).

More detail: `src/widgets/ARCHITECTURE.md`.

---

## Theme & Mantine layers

Mantine is the **render engine only**. Design tokens and cascade live in SCSS / CSS variables.

### Source of truth

```txt
src/assets/theme/tokens/     ← CSS variables (edit here)
        ↓
mantineTheme.ts              ← thin Mantine theme bridge
        ↓
elements (AppButton / …) + widgets
```

| Path                      | Role                                  |
| ------------------------- | ------------------------------------- |
| `tokens/theme.scss`       | Global brand, spacing, tooltip paints |
| `tokens/widgets/header/`  | Header-scoped CMF tokens              |
| `tokens/widgets/sidebar/` | Sidebar-scoped CMF tokens             |
| `mantine/vars/`           | Mantine `vars()` resolvers            |
| `mantine/styles/`         | Control cascade + active states       |
| `mantine/cmf/`            | Cascade naming helpers / docs         |

### CSS cascade layers

Declared in `src/assets/styles/layer-order.css` (weakest → strongest):

```txt
reset → base → env → mantine → mantine-rebase → components → page → widget → theme
```

Inside widgets:

```txt
widget.base → widget.element → widget.component → widget.layout → widget.variant
```

| Layer            | Owns                                            |
| ---------------- | ----------------------------------------------- |
| `mantine`        | `@mantine/core` base styles                     |
| `mantine-rebase` | Theme `classNames` (Button / ActionIcon bridge) |
| `widget.*`       | Shell structure, spacing, type skins            |
| `theme`          | Token overrides (wins last)                     |

### CMF cascade (Button / ActionIcon)

DOM attrs on the control root drive specificity:

| Attr                 | Example                  | Token segment |
| -------------------- | ------------------------ | ------------- |
| `data-cmf-component` | `header` / `sidebar`     | `{component}` |
| `data-cmf-key`       | `logo`, `sign_in`        | `{key}`       |
| `data-cmf-role`      | `parent` / `child`       | `{role}`      |
| `data-variant`       | `transparent`, `outline` | `{variant}`   |

Winner order (most specific → least):

```txt
1. --cmf-button-{component}-{key}-{prop}
2. --cmf-button-{component}-{role}-{prop}
3. --cmf-button-{component}-{prop}
4. --cmf-button-{variant}-{prop}
5. --cmf-button-{prop}
6. Mantine / built-in paint
```

ActionIcon uses `--cmf-action-icon-*` (prop `size`).  
Button uses `--cmf-button-*` (props `height`, `padding-x`, `fz`).

```scss
/* Example: header Sign In */
--cmf-button-header-sign_in-bg: var(--mantine-color-brand-4);

/* All sidebar ActionIcons */
--cmf-action-icon-sidebar-size: calc(2.25rem * var(--mantine-scale));
```

**Edit tokens, not the Sass engine.** Full guide: `src/assets/theme/README.md`, `src/assets/theme/mantine/cmf/CASCADE.md`.

---

## State & API

| Concern                          | Where                    | Notes                                   |
| -------------------------------- | ------------------------ | --------------------------------------- |
| Lists, init, pages, translations | TanStack Query (`api/`)  | Structured keys, `staleTime` / `gcTime` |
| Auth, session, feature flags     | Redux Toolkit (`store/`) | No API cache, no modal UI state         |
| Lobby session token              | In-memory (`api/lobby`)  | Not Redux; not `localStorage`           |

Bootstrap order: **translation → init**. Auth tokens stay httpOnly on the backend.

---

## Storybook

```bash
yarn storybook
```

**Published (main):** [obj-qed.github.io/iGambling](https://obj-qed.github.io/iGambling/)

| Area              | Contents                                                      |
| ----------------- | ------------------------------------------------------------- |
| **Develop**       | Public architecture + **Security** threat model for AI review |
| Guide / Theme     | How-to, brand palette, settings dump                          |
| Elements          | Button, ActionIcon — variants, sizes, playground              |
| Widgets / Header  | AppHeader shell, special blocks, menu items                   |
| Widgets / Sidebar | Aside shell, special blocks                                   |

Toolbar: color scheme, primary brand, header session, app settings.

---

## Headroom (optional LLM proxy)

Local [Headroom](https://headroom-docs.vercel.app/) proxy for agent/context compression. **Output shaper** (verbosity / effort routing) is off by default upstream — this repo turns it on when you start the script:

```bash
export HEADROOM_OUTPUT_SHAPER=1     # off by default upstream; script sets this
yarn headroom:proxy                 # → headroom proxy --port 8787
# or: bash scripts/headroom-proxy.sh
```

Point clients at the proxy (`ANTHROPIC_BASE_URL=http://127.0.0.1:8787` or `headroom wrap …`). If `:8787` is taken (e.g. another local tool), set `HEADROOM_PORT`.

Live knobs (including `HEADROOM_OUTPUT_SHAPER`) can also be hot-synced via `headroom wrap` without restarting the proxy.

---

## Quality & CI

On push/PR to `main`: lint · stylelint · test · build.

On push to `main`: Storybook → **GitHub Pages** (`.github/workflows/ci.yml`).

```bash
yarn check:precommit   # lint + stylelint + build
```

---

## Further reading

| Doc                                       | Topic                       |
| ----------------------------------------- | --------------------------- |
| `src/widgets/ARCHITECTURE.md`             | Header pipeline (mermaid)   |
| `src/assets/theme/README.md`              | Theme layout & CMF overview |
| `src/assets/theme/mantine/cmf/CASCADE.md` | CMF token naming & debug    |
| `src/assets/styles/layer-order.css`       | CSS `@layer` order          |
