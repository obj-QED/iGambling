# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

iGambling — React 19 + Vite + TypeScript frontend SPA (online gambling/casino). No backend in this repo; the Vite dev server proxies API calls (`/apiLobby.php`, `/api.php`) to a remote PHP backend at `https://999ggg.net` (configurable via `VITE_APP_URL`).

### Package manager

This project uses **Yarn Berry (v4)** with `nodeLinker: node-modules`. The VM ships with Yarn Classic v1 via nvm, so you must activate Yarn Berry before installing:

```
corepack enable
corepack prepare yarn@stable --activate
```

The update script handles this automatically.

### Common commands

See `README.md` — key scripts:

| Command | Purpose |
|---|---|
| `yarn dev` | Vite dev server on `http://localhost:5173` |
| `yarn test` | Vitest with v8 coverage (`vitest run --coverage`) |
| `yarn lint` | ESLint |
| `yarn stylelint` | Stylelint for CSS/SCSS |
| `yarn build` | TypeScript check + Vite production build |
| `yarn format` | Prettier |

### Known pre-existing issues

- **`src/api/` directory is missing** — the codebase imports `@/api/lobby` and `@/api/queryClient` in several files, but the `src/api/` directory does not exist in the repo. This causes:
  - `yarn build` to fail (TypeScript errors)
  - 2 Vitest suites to fail (`AppHeader.test.tsx`, `mantineTheme.test.ts`)
  - The app to show a Vite error overlay at runtime (module not found)
- `yarn lint` reports 1 pre-existing import-sort error in `src/shared/lib/index.ts`
- `yarn stylelint` reports 12 pre-existing style issues

### Dev server notes

- The Vite dev server starts successfully and serves HTML at `http://localhost:5173/`, but the React app cannot fully render due to the missing `src/api/` module.
- Hot reload works for files that don't depend on the missing `@/api/lobby` import chain.
- The proxy configuration in `vite.config.ts` forwards `/apiLobby.php` and `/api.php` requests to `VITE_APP_URL` (default `https://999ggg.net`).

### Testing

- Test runner: Vitest with jsdom environment
- Tests run in-memory without external services
- 12/14 test suites pass; 2 fail due to the missing `src/api/` module (pre-existing)
