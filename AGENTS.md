# iGambling (devcasi) project rules — summary

Canonical SoT: `.cursor/rules/00-core.mdc`. Details: `.cursor/rules/devcasi-rules.mdc`. UI: `.cursor/rules/ui-architecture.mdc`. Header: `.cursor/rules/header-architecture-guard.mdc`.

## TL;DR

- **Stack:** React 19, Vite, TypeScript. **State:** TanStack Query (server) + Redux Toolkit (client). **Styles:** CSS Modules + SASS (tokens). **UI:** FSD + schema-driven widgets; header/sidebar = sync registries + colocated `adapters.ts` + `@/shared/lib/widgetAdapter`.
- **Architecture:** FDD + FSD. Feature boundary = `public.ts`. Cross-feature imports only via `public.ts`.
- **Widgets:** `src/widgets/header|sidebar|banner|footer` — orchestration; `components/` re-exports `@/widgets` (legacy).
- **Component patterns:** `.cursor/rules/widget-component-patterns.mdc` — shared (`AppLink`, `CmfIcon`), header/sidebar adapters.
- **Skeleton:** `params.preloader.skeleton: false` → no visible skeleton anywhere. Gates: `ShellSkeletonGate` + `InViewSkeletonGate` / `isShellSkeletonEnabled()` (`.cursor/rules/shell-skeleton.mdc`).

## UI layers (CRITICAL)

1. **Entity** (`entities/*`) — content, mapping. No overlays/layout.
2. **Block** (`widgets/*/ui/blocks/*`) — sync router + colocated `adapters.ts` (lazy map).
3. **Adapter runtime** (`shared/lib/widgetAdapter`) — `useAdapter` / `AdapterBoundary` / `preloadAdapters` / `useWrapper`.
4. **Wrapper** (`shared/ui/overlay/*`) — generic Popover/Drawer/Tooltip; mode from schema, not `isMobile` JSX.
5. **Registry** — `registry/`: `layoutRegistry` + `blockRegistry` (sync only).

## Header / sidebar

- Path: `src/widgets/header|sidebar/` — `registry/`, `ui/blocks/*/adapters.ts`, `config/`, `ui/`.
- Pipeline: `schema → layout → block(sync) → adapters.ts → widgetAdapter(lazy) → entity`.
- `registry/`: only `layoutRegistry` + `blockRegistry`. **No** per-widget `plugins/` / `sdk/` / `runtime/`.
- `blockVariants`: schema-only unions — no `if (isMobile)` in JSX.
- Data: `useHeaderMenu` in `app/layouts/` only.

## FSD order

`app → pages → widgets → features → entities → shared`

## State, links, config, theme

- Server: TanStack Query. Client: Redux (auth, flags). No API cache/modal state in Redux.
- Links: `getAppHrefKind` + `AppLink` (external `<a>`, internal `Link`, invalid `<span>`).
- Config: `window.__SETTINGS__` only at the parser boundary (`shared/config`); optional fields use `??`.
- Theme: `src/assets/theme/theme.scss` (SoT); `mantineTheme.ts` = thin bridge.

## Styles

- CSS Modules + BEM (max 1 nest level). Canonical `@layer`: reset → … → widget → theme; inside widget: base → element → component → layout → variant. Theme sets tokens (including layout values); schema selects behavior.

## React 19

- SPA only (no RSC). `Suspense` for lazy routes/blocks. `useTransition` for heavy updates.

## TypeScript

- Strict; unknown at boundaries; exact unions for known domains. No `variant: string` / `any` in app contracts.

## Tests & security

- Vitest + RTL under root `test/` (mirror of `src/`; never colocate next to components). Playwright E2E. Tokens httpOnly only; minimal auth in Redux.

## Application context (before routing/API/layout changes)

1. Route + layout (`MainLayout` / `BlankLayout`).
2. Bootstrap: `translation` → `init` (TanStack Query keys).
3. Update selectors/hooks/consumers together on contract changes.
4. Run `lint` and `build` after substantive edits.
