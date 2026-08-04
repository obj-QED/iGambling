/** Static copy for Develop Storybook tabs — English for external AI review. */

export const DEVELOP_STACK_ROWS: readonly [string, string][] = [
  ['UI', 'React 19 · TypeScript · Mantine 9 · SCSS Modules'],
  ['Build', 'Vite · Yarn 4 · Node ≥ 22'],
  ['Server state', 'TanStack Query (`src/api`)'],
  ['Client state', 'Redux Toolkit — auth / session / flags only'],
  ['Routing', 'React Router 6'],
  ['Quality', 'ESLint · Stylelint · Vitest · Storybook · Playwright a11y'],
  ['Architecture', 'FSD layers + FDD (`public.ts` boundaries)'],
];

export const DEVELOP_SRC_TREE = `src/
├── app/           bootstrap, providers, routing, layouts (menu fetch)
├── pages/         route pages
├── widgets/       header · sidebar · banner · footer
├── features/      user workflows (public.ts boundary)
├── entities/      domain content + mapping
├── elements/      AppButton, AppActionIcon — Mantine wrappers
├── shared/        ui kit, config, schema, lib, types
├── api/           axios clients, queries, mutations, keys
├── store/         Redux — auth / flags only (no API cache)
├── assets/        theme tokens (SoT), settings stub, global SCSS
├── stories/       Storybook stories (this lab)
└── storybook/     Storybook helpers (not app runtime)

test/              Vitest — mirror of src/ (never colocated under src/)`;

export const DEVELOP_IMPORT_RULE = `Import only downward:

  app → pages → widgets → features → entities → elements / shared

Cross-feature / cross-widget imports ONLY via public.ts (or index.ts).
Widgets must NOT call useQuery / getSettings() inside ui/ — schema + menu via props.`;

export const DEVELOP_PLATFORM_PIPELINE = `PHP API / init
  → normalize menu (Zod / shared schemas)
  → window.__SETTINGS__ (+ brand / page / props layers)
  → resolve*Schema (shared/schema + widget config)
  → WidgetSchema props
  → layoutRegistry (sync)
  → blockRegistry (sync)
  → adapter / wrapper (lazy where needed)
  → entity content
  → shared/ui + theme CSS vars`;

export const DEVELOP_HEADER_PIPELINE = `useAppLayout
  → resolveHeaderSchema({ global: settings.header })
  → AppHeader({ menu, config })
  → typePack Strategy (sync)
  → layoutRegistry (sync)
  → section → blockRegistry (sync)
  → plugin adapters (lazy) + WRAPPER_REGISTRY
  → entities / shared/ui`;

export const DEVELOP_SIDEBAR_PIPELINE = `__SETTINGS__.aside + menu
  → resolveSidebarSchema / resolveSidebarConfig
  → Root: mergeCustomBlocks → splitSidebarMenu
  → typePack Strategy owns chrome tree
  → SidebarHeader / ScrollArea+Shell / SidebarFooter (children slots)
  → Section → Block → BLOCK_REGISTRY
  → ItemButton / Dropdown / CmfIcon / AppLink

Regions gate (config.regions): header | main | footer
Type customBlocks = global customBlocks + aside.types[type].customBlocks`;

export const DEVELOP_FORBIDDEN = [
  'if (isMobile) / duplicated desktop+mobile JSX trees',
  'switch(variant) to pick UI — use registries / schema instead',
  'useQuery / useMutation inside widgets/*/ui or shared/ui',
  'API cache or modal open state in Redux',
  'Tokens / secrets in localStorage or VITE_*',
  'Deep imports bypassing public.ts',
  'Business logic in layout SCSS — tokens & paint only',
];

export const DEVELOP_AI_CHECKLIST = [
  'FSD import direction respected (no upward / sibling feature imports)?',
  'Widgets receive menu + schema/config only — no fetch in ui/?',
  'New special blocks registered in blockRegistry (sync) — not ad-hoc switches?',
  'Behavioral responsive via schema adapters; structural via CSS [data-layout]?',
  'TanStack Query keys structured; staleTime + gcTime set?',
  'Redux limited to auth/session/flags?',
  'Theme changes in tokens/*.scss — not hard-coded in components?',
  'CMF cascade attrs present on menu controls (data-cmf-*)?',
  'Tests under root test/ mirroring src/?',
  'public.ts exports stable for cross-module consumers?',
];

export const DEVELOP_KEY_PATHS: readonly [string, string][] = [
  ['src/widgets/ARCHITECTURE.md', 'Schema-driven widgets overview'],
  ['src/shared/schema/', 'resolveWidgetSchema, merge layers, capabilities'],
  ['src/shared/ui/overlay/', 'WRAPPER_REGISTRY (popover/drawer/modal/…)'],
  ['src/widgets/header/', 'Header Engine path (typePacks + plugins)'],
  ['src/widgets/sidebar/', 'Aside Strategy + regions + customBlocks'],
  ['src/assets/theme/', 'Design tokens SoT + CMF cascade'],
  ['src/assets/settings/index.js', 'window.__SETTINGS__ stub'],
  ['src/app/layouts/', 'Data orchestration (menus + schema resolve)'],
  ['test/', 'Vitest suites (mirror of src/)'],
];

export const DEVELOP_SEPARATION_ROWS: readonly [string, string][] = [
  ['Theme (assets/theme)', 'colors, spacing, radius, fonts, sizes'],
  ['Settings (__SETTINGS__)', 'behavior, layout, variants, wrappers, capabilities'],
  ['API / init', 'menu and page content data'],
  ['Schema (resolve*Schema)', 'merged contract passed as props'],
];

export const DEVELOP_CMF_ORDER = `Winner order (most specific → least):

1. --cmf-button-{component}-{key}-{prop}
2. --cmf-button-{component}-{role}-{prop}
3. --cmf-button-{component}-{prop}
4. --cmf-button-{variant}-{prop}
5. --cmf-button-{prop}
6. Mantine / built-in paint

Attrs on control root: data-cmf-component, data-cmf-key, data-cmf-role, data-variant
ActionIcon uses --cmf-action-icon-* (size). Button uses --cmf-button-* (height, padding-x, fz).`;
