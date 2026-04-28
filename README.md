# iGambling

Application built with **React 19**, **Vite**, and **TypeScript**.

## Stack

- React 19, Vite, TypeScript
- React Router 6
- FDD-based structure: `docs/new-project/architecture.md`, `docs/new-project/rules-new-project.md`

## Environment Variables

- **Local (`yarn dev`)**: Vite proxies `/apiLobby.php` and `/api.php` to `VITE_APP_URL`.
- **Production (`yarn build`)**: the frontend requests `apiLobby.php` relative to the current origin.

| Variable       | Purpose                                                                    |
| -------------- | -------------------------------------------------------------------------- |
| `VITE_APP_URL` | Base URL for dev proxy (`server.proxy`) and client `baseApi` (`api.php`)  |

`proxy.php` is not used in the current setup.

## Run

```bash
yarn install
yarn dev      # development mode (http://localhost:5173)
yarn test     # unit/integration tests (Vitest)
yarn lint     # eslint
yarn build    # production build
yarn build:analyze # build + bundle size report (dist/stats.html)
yarn preview  # preview production build
```

## `src/` Structure

- `app/` - bootstrap, providers, routing
- `pages/` - pages (routes)
- `components/` - feature components (FDD)
- `elements/` - UI primitives
- `ui/` - shared UI kit
- `api/` - baseApi, queries, mutations
- `store/` - Redux Toolkit (slices)
- `shared/` - utils, styles (tokens, mixins)
- `schemas/` - validation
- `hooks/` - shared hooks

Rules and architecture: see `docs/new-project/` and `.cursor/rules/devcasi-rules.mdc`.

## AppHeader (default variant)

Data sources:

- `title` and `logo` come from `useCurrentPageDataState(...)` (current page payload).
- `providers` come from `window.__SETTINGS__.header.providers` (`src/assets/settings/index.js`).

Current default variant composition:

- `ui/variants/default/AppHeaderDefaultView.tsx` - render orchestration.
- `ui/blocks/AppHeaderDefaultLayout/` - 3 header sections (left / center / right).
- `ui/blocks/AppHeaderLogo/` - logo (URL) or fallback `IG`.
- `ui/blocks/AppHeaderProvidersNav/` - providers list.
- `ui/blocks/AppHeaderPageTitle/` - page title.
- `ui/blocks/AppHeaderGuestActions/` and `ui/blocks/AppHeaderUserActions/` - right column based on auth state.

If you pass `sections` into `AppHeader`, override slots are used.
