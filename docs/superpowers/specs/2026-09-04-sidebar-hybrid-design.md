# Sidebar hybrid — design

Date: 2026-09-04  
Scope: `src/widgets/sidebar`, consumers in `app/layouts/AppLayout`, Storybook/tests that pass `menu`/`config`.

## Goal

Readable sidebar component surface:

1. **Hybrid data** — without props, read `initV2` from TanStack Query cache; with props (Storybook/tests), use passed `menu`/`config`.
2. **Visible structure** — `layout` + `type` from `aside` settings (`type: 'default' | 'compact'`, `layout: 'aside'`, …) as real JSX from `ui/layouts/*` and `ui/type/*`.
3. **No `createElement`** — neither in `Root`/`Sidebar` for layout, nor in `Block` for item routing.
4. **Loading/error** — handled inside the sidebar when running in cache mode (`ShellSkeletonGate` / `null`).

## Non-goals

- Header / banner / footer hybrid migration.
- New layout keys or plugin/engine folders.
- `useQuery` inside `ui/` (hook lives in `hooks/`).
- Dual desktop/mobile JSX trees / `if (isMobile)` for block choice.

## Decisions (locked)

| Topic           | Choice                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Data ownership  | Hybrid (C): props override; else cache                                 |
| Type chrome     | Explicit Strategy JSX (header / scroll / footer)                       |
| Loading / error | Inside Sidebar (B)                                                     |
| Approach        | Single `Sidebar` + `useSidebar` (1), not container/dumb split          |
| Block routing   | Explicit switch / early returns with JSX (A)                           |
| Layout in Root  | `const Layout = …; return <Layout>…</Layout>` — **no** `createElement` |

## Public API

```ts
type AppSidebarProps = {
  /** Omit → resolve menu from initV2 cache (+ aside.mockMenu). */
  menu?: HeaderMenuModel | null;
  /** Omit → resolveSidebarSchema(aside settings). */
  config?: SidebarConfig;
  className?: string;
};

export { Sidebar as AppSidebar } from './ui/Sidebar'; // or rename Root → Sidebar
```

`AppSidebar` remains the public name. Internal display name: `Sidebar`.

## Hook: `useSidebar`

Path: `src/widgets/sidebar/hooks/useSidebar.ts` (not in `ui/`).

```ts
type UseSidebarArgs = {
  menu?: HeaderMenuModel | null;
  config?: SidebarConfig;
};

type UseSidebarResult = {
  data: HeaderMenuModel | null;
  config: SidebarConfig;
  loading: boolean;
  error: Error | null;
  fnMutation: () => Promise<unknown>; // invalidate init (useInvalidateInit)
};
```

### Modes

| Mode  | Condition            | Behavior                                                                                                                                                                |
| ----- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Props | `menu !== undefined` | `data = menu`, `loading = false`, `error = null`. Config from props or `resolveSidebarSchema`.                                                                          |
| Cache | `menu === undefined` | `useInitData(language, getInitialPath())` — **same queryKey** as bootstrap. `data = resolveSidebarMenu(init.content)`. `fnMutation` = `useInvalidateInit().fnMutation`. |

Rules:

- Widget must not import `app/`. Move `resolveSidebarMenu` (+ flat `left` extract) into `widgets/sidebar/lib` (or colocated helper). Reuse `mapFlat` / `findMenuRootInInit` via public/api paths already allowed for widgets.
- Mock: `aside.mockMenu === true` → `getSidebarMenuMock()` (unchanged).
- Cache `loading`: query enabled + `pending` **and** no usable `data` yet. Refetch with existing data does not blank the chrome.
- Cache `error`: surface when there is no `data`; with stale `data`, keep rendering (optional: ignore error if data present).

## Component: `Sidebar` (today `Root.tsx`)

```tsx
function Sidebar({ menu, config: configProp, className }: AppSidebarProps) {
  const { data, config, loading, error } = useSidebar({ menu, config: configProp });

  if (loading) {
    return (
      <ShellSkeletonGate>
        {/* aside-shaped skeleton slot; gated by params.preloader.skeleton */}
      </ShellSkeletonGate>
    );
  }
  if (error || !data) return null;

  // … merge customBlocks, splitSidebarMenu, providers …
  const Layout = resolveSidebarLayoutComponent(config.layout); // DefaultLayout | Container…
  const { Strategy, styles: typeStyles } = resolveSidebarTypePack(config.type);

  return (
    <aside data-layout={config.layout} data-type={config.type} /* … */>
      <Layout layout={config.layout}>
        <Strategy layout={chromeLayout} config={config} />
      </Layout>
    </aside>
  );
}
```

### Remove `createElement` here

**Before (forbidden after change):**

```tsx
{
  createElement(resolveSidebarLayout(config.layout), {
    layout: config.layout,
    children: <Strategy layout={chromeLayout} config={config} />,
  });
}
```

**After:**

```tsx
const Layout = resolveSidebarLayout(config.layout);
// …
<Layout layout={config.layout}>
  <Strategy layout={chromeLayout} config={config} />
</Layout>;
```

`resolveSidebarLayout` stays a sync lookup returning a component; render is JSX only.

## Type Strategy (explicit tree)

Each type owns full chrome in `ui/type/{default|compact}/Strategy.tsx`:

```txt
Type Strategy
├── HeaderRegion     (optional via config.regions)
│     special key → Block
│     else → HeaderLink (pack)
├── MainRegion       ScrollArea wrapper
│     Shell → Section → Block
└── FooterRegion
      special key → Block
      else → FooterLink (pack)
```

Duplicate freely between default and compact (already the rule). No shared “one ChromeStrategy”.

## Block routing — no `createElement`, no opaque registry call in JSX

`ui/Block.tsx` becomes an explicit router:

```tsx
function Block({ item, className }: BlockProps) {
  // compact overlay: if typePack.blocks[key] exists, render that component as JSX
  // (resolve once, then <Overlay … /> / switch — not createElement)

  if (item.items !== undefined && item.items.length > 0) {
    return <DropdownBlock item={item} className={className} />;
  }

  switch (item.key) {
    case 'search_leftmenu':
      return <Search item={item} className={className} />;
    case 'timer':
    case 'wheel_mdl':
      return <PromoBlock item={item} className={className} />;
    case 'aside_header_logo':
      return <Logo item={item} className={className} />;
    default:
      return <DefaultItemBlock item={item} className={className} />;
  }
}
```

### Compact overlay

Today: `typePack.blocks` + `resolveBlockComponent(item, overlay)` + `createElement`.

Target:

- Prefer **explicit branches** in Block (or thin helpers that return elements), e.g. when `typePack.key === 'compact'`, `search_leftmenu` → `<SearchIconVariant />` instead of lazy Search router (same behavior as current sync overlay).
- Or: `const Overlay = typePack.blocks?.[key]; if (Overlay) return <Overlay … />` — still JSX, still no `createElement`.
- Global `BLOCK_REGISTRY` / `registerBlocks` may remain for tests/HMR or be slimmed to the switch SoT; do not keep `createElement(resolveBlockComponent(…))` as the render path.

### Exceptions

Row variants (`SearchRowVariant`, `PromoRowVariant`) keep using `SidebarExceptionButton`. Documented in the block table; not a separate registry.

| Condition               | Block                            | Compact overlay         | Exception                                     |
| ----------------------- | -------------------------------- | ----------------------- | --------------------------------------------- |
| `item.items.length > 0` | `DropdownBlock`                  | —                       | —                                             |
| `search_leftmenu`       | `Search`                         | `SearchIconVariant`     | `SearchRowVariant` → `SidebarExceptionButton` |
| `timer` / `wheel_mdl`   | `PromoBlock`                     | `PromoIconVariant`      | `PromoRowVariant` → `SidebarExceptionButton`  |
| `aside_header_logo`     | `Logo`                           | `Logo`                  | —                                             |
| else                    | `DefaultItemBlock` → pack `Item` | compact ActionIcon Item | —                                             |

Unknown API keys → default. New special keys → new `case` + table row.

Overlay wrappers (`wrappers.search` / `wrappers.promo`) stay inside Search/Promo via `useWrapper` — not in Type Strategy.

## AppLayout

- `useAppLayout` drops `sidebarMenu` / `sidebarConfig` (header/footer/banner unchanged).
- `AppLayoutChrome` / `SidebarSlot`:

```tsx
<AppSidebar className={asideClassName} />
```

- BootGate still waits for first init; cache mode usually hits warm cache.
- `lockSidebarWidth`: remove `sidebarMenu` dependency; lock after aside paint (`skeleton` + `isMobile`).

## Storybook / tests

- Stories keep passing `menu` + `config` (props mode). No TanStack Query in stories.
- New/updated tests under root `test/`:
  - `useSidebar` — cache vs props, loading/error/`fnMutation`
  - `Block` — key → component (incl. compact overlay)
  - `AppLayoutChrome` — sidebar without menu/config
  - tests for moved `resolveSidebarMenu`

## File touch list (expected)

| Area                                      | Change                                                 |
| ----------------------------------------- | ------------------------------------------------------ |
| `hooks/useSidebar.ts`                     | new                                                    |
| `lib/resolveSidebarMenu.ts` (or similar)  | move from app                                          |
| `ui/Root.tsx` → `Sidebar`                 | hybrid + JSX Layout; no `createElement`                |
| `ui/Block.tsx`                            | explicit switch; no `createElement`                    |
| `ui/type/*/Strategy.tsx`                  | keep/clarify explicit trees                            |
| `registry/layouts.ts`                     | lookup only; consumers use `<Layout>`                  |
| `registry/blocks.ts`                      | slim or keep for tests; not render via `createElement` |
| `public.ts`                               | export hook/types if needed; `AppSidebar`              |
| `app/layouts/AppLayout/*`                 | stop passing sidebar menu/config                       |
| `test/widgets/sidebar/**`                 | new contract tests                                     |
| docs: `ARCHITECTURE.md` / Develop stories | pipeline note if already documenting sidebar           |

## Risks

- Rules say “no `useQuery` in `ui/`” — satisfied if hook is in `hooks/`; Sidebar only calls `useSidebar`.
- Double subscription to `useInitData` (bootstrap + layout + sidebar) is fine (same key, shared cache).
- Props `menu={null}` must mean props mode with empty menu (not fall through to cache) — use `menu !== undefined` as the discriminator.
- Compact overlay behavior must stay sync (no Suspense hole in ActionIcon rail).

## Success criteria

1. Reading `Sidebar` shows: hook → layout component → type Strategy → regions → blocks.
2. Zero `createElement` in sidebar `ui/Root` (Sidebar) and `ui/Block`.
3. App runtime: `<AppSidebar className={…} />` without menu/config; Storybook still works with props.
4. `yarn lint` / `yarn build` / targeted sidebar + AppLayout tests pass.
