# CMF cascade — how styles resolve

**Edit tokens, not the engine.**  
Runtime SoT for widget controls (`data-cmf-*`): theme `vars()` **clear** Mantine inline vars, then **add** nested `var()` chains from `cmfCascadeResolve.ts` (`nestCssVars` / `buildCmf*PropToken`).

Custom `data-variant` (not a Mantine built-in) uses the same paint bridge (`resolveButtonCustomVariantPaintVars`).

---

## Where to change what

| Goal                                                     | File                                                                                |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Header Button / ActionIcon look                          | `tokens/widgets/header/tokens.scss`                                                 |
| Sidebar Button / ActionIcon look                         | `tokens/widgets/sidebar/tokens.scss`                                                |
| Tooltip colors / max-width                               | `:root` in `tokens/theme.scss` (portal-safe)                                        |
| Custom variant paint (e.g. `hero`, `button-link`→`link`) | `:root` `--cmf-button-{cascade}-{bg\|color\|hover\|…}`                              |
| New menu key                                             | set `--cmf-button\|action-icon-{component}-{key}-*` + `data-cmf-key` (no allowlist) |
| Mantine paint fallbacks                                  | `MANTINE_VARIANT_FALLBACKS` in `vars/buttonVars.ts`                                 |

---

## DOM attrs that drive the cascade

On the control root (Button / ActionIcon / tooltip floating):

| Attr                 | Example                             | Token segment   |
| -------------------- | ----------------------------------- | --------------- |
| `data-cmf-component` | `header` / `sidebar` / `*-dropdown` | `{component}`   |
| `data-cmf-key`       | `logo`, `sign_in`, `logo-trigger`   | `{key}`         |
| `data-cmf-role`      | `parent` / `child` / `trigger`      | `{role}`        |
| `data-variant`       | `transparent`, `outline`, …         | `{variant}`     |
| `data-size`          | `sm`, `md`, …                       | size table only |

`data-key` is identity only — cascade uses **`data-cmf-key`**.  
Logo blocks force semantic keys: header/sidebar `logo`, sidebar trigger `logo-trigger`.

---

## Runtime pipeline

```txt
data-cmf-* + data-variant
        ↓
vars(): CLEAR_* (null)  →  resolve*RootVars (nestCssVars)
        ↓
--button-* / --ai-* = var(--cmf-…-key, var(--cmf-…-role, var(--cmf-…-comp, var(--cmf-…-variant, fallback))))
```

---

## Winner order (most specific → least)

```txt
1. --cmf-{button|action-icon}-{component}-{key}-{prop}
2. --cmf-{button|action-icon}-{component}-{role}-{prop}
3. --cmf-{button|action-icon}-{component}-{prop}
4. --cmf-{button|action-icon}-{variant}-{prop}     (paint / size props)
5. --cmf-{button|action-icon}-{prop}               (shared: radius, justify, icon-*)
6. built-in paint / Mantine size table
```

Group layout (`data-cmf-*` on Mantine `Group`):

```txt
1. --cmf-group-{component}-{key}-{gap|align|justify|wrap}
2. --cmf-group-{component}-{gap|align|justify|wrap}
3. --cmf-group-{gap|align|justify|wrap}
4. Mantine defaults (sm / center / flex-start / wrap)
```

→ `--group-gap` / `--group-align` / `--group-justify` / `--group-wrap`
Tooltip (portal → tokens on `:root`):

```txt
1. --tooltip-{component}-{key}-{prop}
2. --tooltip-{component}-{prop}
3. engine base (then optional --tooltip-{prop} aliases on :root)
```

Props: `bg` | `color` | `radius` | `max-width`.

Drawer (portal → tokens on `:root`, via `AppDrawer` + `data-cmf-*` / `data-viewport`):

```txt
1. --drawer-{component}-{key}-{prop}
2. --drawer-{component}-{prop}
3. engine base (then optional --drawer-{prop} aliases on :root)
```

Props: `bg` | `color` | `radius` | `padding` | `shadow` | `overlay-opacity` | `overlay-blur`.  
Optional size / float: `--drawer-size`, `--drawer-size-{mobile|tablet|laptop|pc}`, `--drawer-inset`.

**Where to override by viewport / instance** — `tokens/theme.scss` (not `AppDrawer` SCSS):

```scss
[data-cmf-component='layout'][data-cmf-key='sidebar'][data-viewport='mobile'] {
  /* key layer — CMF cascade reads `--drawer-layout-sidebar-*`, not bare `--drawer-*` */
  --drawer-layout-sidebar-radius: 0;
  --drawer-layout-sidebar-padding: 0;
  --drawer-inset: 0;
}

/* or global breakpoint */
@media (max-width: $mobile) {
  :root {
    --drawer-radius: 0;
    --drawer-padding: 0;
  }
}
```

Aside _widget_ tokens (`--aside-*`) stay in `tokens/widgets/sidebar/tokens.scss` and use `@media ($mobile)` — `data-viewport` is on the drawer portal, not `[data-widget='sidebar']`.

Components / keys used with the CSS cascade maps: register in `_cmf-drawer-cascade.scss` (`$cmf-drawer-components` / `$cmf-drawer-keys`). Theme can still set base `--drawer-*` on any `[data-cmf-*]` selector without a map entry.

---

## Copy-paste examples

```scss
/* Header Sign In background */
--cmf-button-header-sign_in-bg: var(--mantine-color-brand-4);

/* All header buttons: center label */
--cmf-button-header-justify: center;

/* Header logo (data-cmf-key="logo") */
--cmf-button-header-logo-padding-x: 0;
--cmf-button-header-logo-bg: transparent;

/* Sidebar header chrome: burger / logo-trigger ActionIcon */
--cmf-action-icon-sidebar-header-logo-trigger-size: calc(2.25rem * var(--mantine-scale));
--cmf-action-icon-sidebar-header-logo-trigger-icon-scale: 1.25;

/* Tooltip width for aside rows */
--tooltip-sidebar-max-width: 12rem;
--tooltip-sidebar-item-max-width: 10rem;
```

ActionIcon uses `--cmf-action-icon-*` and prop **`size`** (not `height`).  
Button uses `--cmf-button-*` and **`height`** / **`padding-x`** / **`fz`**.

---

## Debug in DevTools

1. Select the control.
2. Check `data-cmf-component`, `data-cmf-key`, `data-variant`.
3. Read computed `--button-*` / `--ai-*` (or `--tooltip-*`) — values are nested `var(--cmf-…, …)` from JS.
4. Trace which `--cmf-*` token is defined on `[data-widget]` / `:root`.

If a key token does nothing: `data-cmf-key` ≠ token segment (e.g. API key `aside_header_logo` vs cascade key `logo`), or the token is unset.
