# CMF cascade — how styles resolve

**Edit tokens, not the engine.**  
Runtime SoT for widget controls (`data-cmf-*`): theme `vars()` **clear** Mantine inline vars, then **add** nested `var()` chains from `cmfCascadeResolve.ts` (`nestCssVars` / `buildCmf*PropToken`).

Custom `data-variant` (not a Mantine built-in) uses the same paint bridge (`resolveButtonCustomVariantPaintVars`).

Plain Mantine `gradient` / `white` (no `data-cmf-*`) also use that paint bridge — native Mantine sets gradient hover≈bg and white text to black.

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
5. --cmf-{button|action-icon}-{parent}-{prop}   when component is `{widget}-{chrome}`
   (sidebar-header|footer|dropdown → sidebar; header-dropdown → header)
6. --cmf-{button|action-icon}-{prop}               (shared: radius, justify, icon-*)
7. built-in paint / Mantine size table
```

So `--cmf-button-sidebar-active-*` paints **all** aside controls; override with
`--cmf-button-sidebar-header-active-*` / `…-footer-…` / `…-dropdown-…` when needed.
Variant paint (`white` / `gradient`) wins over widget `--cmf-button-sidebar-bg`.
**Seed** `--cmf-button-gradient-*` / `--cmf-button-white-*` on `:root` (see `tokens/theme.scss`)
so an unset variant layer cannot fall through to parent widget paint and break hover.
Active radius: `--*-active-radius` (all corners) and/or `--*-active-radius-{tl|tr|br|bl}`.
Corner → shorthand → `--button-radius` / `--ai-radius`. Shorthand last-resort stays `0`
(for the bar when nothing is set).

Group layout (`data-cmf-*` on Mantine `Group`):

```txt
1. --cmf-group-{component}-{key}-{gap|align|justify|wrap}
2. --cmf-group-{component}-{gap|align|justify|wrap}
3. --cmf-group-{parent}-{gap|align|justify|wrap}   when `{widget}-{chrome}`
4. --cmf-group-{gap|align|justify|wrap}
5. Mantine defaults (sm / center / flex-start / wrap)
```

→ `--group-gap` / `--group-align` / `--group-justify` / `--group-wrap`

Modal (always — `themeComponents` + `modalVars`; optional `data-cmf-*`):

```txt
1. --cmf-modal-{component}-{key}-{prop}
2. --cmf-modal-{component}-{prop}
3. --cmf-modal-{prop}
4. Mantine / theme fallback
```

Props: `radius` | `size` | `y-offset` | `x-offset` | `bg` | `color` | `padding` | `shadow` |
`header-padding` | `header-min-height` | `title-fz|fw|lh|color` | `close-size|icon-size|color|hover-bg|radius` |
`overlay-opacity` | `overlay-blur`.  
→ `--modal-*` on root. Paint via `.modalContent` / `.modalHeader` / `.modalTitle` / `.modalClose` / `.modalBody` / `.modalOverlay`.

Behavior defaults (Mantine props): `params.modal` → `getModalDefaultProps()` → `Modal.extend` + wrappers.
@see https://mantine.dev/core/modal/?t=props

Text / Code (`data-cmf-*` on Mantine `Text` / `Code` — `themeComponents` + `textVars` / `codeVars`):

```txt
1. --cmf-{text|code}-{component}-{key}-{prop}
2. --cmf-{text|code}-{component}-{prop}
3. --cmf-{text|code}-default-{prop}   (or `--cmf-text-dimmed|bright-color` when `c` is set)
4. --cmf-{text|code}-{parent}-{prop}   when `{widget}-{chrome}`
5. Mantine / theme fallback
```

Text props: `fz` | `lh` | `color` → `--text-fz` / `--text-lh` / `--text-color`.  
`c="dimmed"` / `c="bright"` → color cascade segment + fallback `var(--mantine-color-dimmed|bright)` (CMF class does not wipe Mantine dimmed).  
`size="sm"` → last-resort `var(--mantine-font-size-sm)` / `var(--mantine-line-height-sm)` (CMF does **not** use `--cmf-text-sm-*`; per-size SoT is `--font-size-*` in `tokens/theme.scss`).  
Code props: `bg` | `color` | `fz` | `radius` | `padding` → `--code-*`.  
Extra paint only under CMF scope (`.text` / `.code`). Plain controls stay native Mantine.

Tooltip (portal → tokens on `:root`):

```txt
1. --tooltip-{component}-{key}-{prop}
2. --tooltip-{component}-{prop}
3. engine base (then optional --tooltip-{prop} aliases on :root)
```

Props: `bg` | `color` | `radius` | `max-width`.

Popover (portal → `:root --popover-*`, via `themeComponents` + `PopoverWrapper` + `data-cmf-*`):

```txt
1. --popover-{component}-{key}-{prop}
2. --popover-{component}-{prop}
3. --popover-{prop}
4. theme fallback
```

Runtime private `--_cmf-popover-*` (no cycle with `:root`).  
Props: `bg` | `color` | `radius` | `shadow` | `padding` | `bd` | `arrow-bg`.  
Paint: `.popoverDropdown` / `.popoverArrow` / `.popoverOverlay`.

Behavior defaults (Mantine props): `params.popover` → `getPopoverDefaultProps()` → `Popover.extend` + `PopoverWrapper` (any [Popover prop](https://mantine.dev/core/popover/?t=props) except `opened` / `onChange` / `children`; instance props win).

Drawer (portal → `:root --drawer-*`, via `themeComponents` + `AppDrawer` + `data-cmf-*`):

```txt
1. --drawer-{component}-{key}-{prop}
2. --drawer-{component}-{prop}
3. --drawer-{prop}
4. theme fallback
```

Runtime private `--_cmf-drawer-*` (no cycle with `:root`).  
Props: `bg` | `color` | `radius` | `padding` | `shadow` | `offset` |
`header-padding` | `header-min-height` | `title-fz|fw|lh|color` | `close-*` |
`overlay-opacity` | `overlay-blur`.  
Header / title / close / content / body / overlay paint: `.drawer*` in `components.module.scss`.  
Optional size / float: `--drawer-size`, `--drawer-size-{mobile|tablet|laptop|pc}`, `--drawer-inset`.

Behavior defaults (Mantine props): `params.drawer` → `getDrawerDefaultProps()` → `Drawer.extend` + `AppDrawer`.
@see https://mantine.dev/core/drawer/?t=props

Tokens live on `:root` in `tokens/theme.scss`. Scope attrs: `data-cmf-component` / `data-cmf-key` / `data-cmf-role` (via `cmfControlAttrs` or spread).

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
