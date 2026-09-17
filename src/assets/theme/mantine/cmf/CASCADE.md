# CMF cascade — how styles resolve

**Edit tokens, not the engine.**  
Runtime SoT for widget controls (`data-cmf-*`): theme `vars()` **clear** Mantine inline vars, then **add** nested `var()` chains from `cmfCascadeResolve.ts` (`nestCssVars` / `buildCmf*PropToken`).

**All** plain `<Button>` / `<ActionIcon>` (no `data-cmf-*`) also use the paint bridge:

```txt
--cmf-button-{variant}-*  →  Mantine paint fallbacks (buttonVars / actionIconVars)
```

Custom `data-variant` (`hero`, `button-link`, …) uses the same paint bridge.

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
**Disabled** uses the same cascade as hover: `--cmf-button|{action-icon}-{…}-disabled` /
`-disabled-color` / `-disabled-bd` → `--button-disabled*` / `--ai-disabled*` (CSS mixin
`cmf-control-disabled-paint`). Last resort = Mantine `--mantine-color-disabled*`.
Active radius: `--*-active-radius` (all corners) and/or `--*-active-radius-{tl|tr|br|bl}`.
Corner → shorthand → `--button-radius` / `--ai-radius`. Shorthand last-resort stays `0`
(for the bar when nothing is set).
**Left/right rail:** set `--cmf-*-active-radius: 0` (or all four corners). Only `-tl`/`-bl`
leaves `-tr`/`-br` → control radius — a 2px rail looks round. Header dropdown:
`--cmf-button-header-dropdown-active-*` under `[data-widget=header][data-type=dropdown]`.
Also set settings `header.active.position: 'left'` so `data-cmf-active-position` matches
(host-radius CSS); paint geometry still comes from inset/width/height tokens.

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

AppSearch triggers (`SearchInputTrigger` / `SearchIconTrigger`, `data-cmf-key=search`):

```txt
1. --cmf-search-{header|sidebar}-search-{prop}
2. --cmf-search-{header|sidebar}-{prop}
3. --cmf-search-{prop}                         (shared look everywhere)
4. Mantine Input / ActionIcon defaults
```

Seed shared paints on `:root` in `tokens/theme.scss`. Place overrides in
`tokens/widgets/header|sidebar` (e.g. `--cmf-search-sidebar-bg`).

**Radius:** shared `--cmf-search-radius` defaults to `--mantine-radius-md` (same as
Button / ActionIcon CMF — not theme `defaultRadius` / sm). Header:
`--cmf-search-header-radius` → `--cmf-button-header-radius`. Sidebar:
`--cmf-search-sidebar-radius` → `--cmf-button-sidebar-radius`.

Search props → `--input-*` on TextInput wrapper (`.searchInput`).
Field **bg / bd / radius** paint on the wrapper (not the `<input>`), so slideout
can fade the input (`opacity: 0`) without losing chrome.

| Element           | Token props (`--cmf-search-…`)                                                                                                        | Runtime                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **field**         | `bg` `color` `bd` `bd-focus` `hover` `hover-color` `hover-bd` `bg-focus` `color-focus` `radius` `height` `placeholder-color` `cursor` | `--input-*` on input                              |
| **icon** (left)   | `icon-color` `icon-hover-color` `icon-focus-color` `icon-size` (legacy: `section-*`)                                                  | `--input-section-color` / `--input-icon-size`     |
| **code** (hotkey) | `code-bg` `code-color` `code-hover-*` `code-focus-*` `code-fz` `code-radius` `code-padding`                                           | `.cmf-Code-root`                                  |
| **clear** (×)     | `clear-color` `clear-bg` `clear-hover-color` `clear-hover-bg` `clear-size` `clear-radius` `clear-icon-size`                           | `.cmf-CloseButton-root` / `[data-cmf-role=clear]` |

Scope examples:

```scss
/* everywhere */
--cmf-search-clear-color: …;
/* all header searches */
--cmf-search-header-clear-color: …;
/* header search key only */
--cmf-search-header-search-clear-color: …;
/* sidebar / modal */
--cmf-search-sidebar-clear-color: …;
--cmf-search-modal-search-clear-color: …; /* modal search */
```

Hotkey `Code` / clear `CloseButton` are painted only via search `--input-code-*` /
`--input-clear-*` inside `.searchInput` (`data-search-part=code|clear`) — not via
global `--cmf-code-*`.

Modal props: `radius` | `size` | `y-offset` | `x-offset` | `bg` | `color` | `padding` | `shadow` |
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

Popover (portal → `:root --cmf-popover-*`, via `themeComponents` + `PopoverWrapper` + `data-cmf-*`):

```txt
1. --cmf-popover-{component}-{key}-{prop}
2. --cmf-popover-{component}-{prop}
3. --cmf-popover-{prop}
4. theme fallback
```

Runtime private `--_cmf-popover-*` (no cycle with `:root`).  
Props: `bg` | `color` | `radius` | `shadow` | `padding` | `bd` | `arrow-bg`.  
Paint: `.popoverDropdown` / `.popoverArrow` / `.popoverOverlay`.

Behavior defaults (Mantine props): `params.popover` → `getPopoverDefaultProps()` → `Popover.extend` + `PopoverWrapper` (any [Popover prop](https://mantine.dev/core/popover/?t=props) except `opened` / `onChange` / `children`; instance props win).

Drawer (portal → `:root --cmf-drawer-*`, via `themeComponents` + `AppDrawer` + `data-cmf-*`):

```txt
1. --cmf-drawer-{component}-{key}-{prop}
2. --cmf-drawer-{component}-{prop}
3. --cmf-drawer-{prop}
4. theme fallback
```

Runtime private `--_cmf-drawer-*` (no cycle with `:root`).  
Props: `bg` | `color` | `radius` | `padding` | `shadow` | `offset` |
`header-padding` | `header-min-height` | `title-fz|fw|lh|color` | `close-*` |
`overlay-opacity` | `overlay-blur`.  
Header / title / close / content / body / overlay paint: `.drawer*` in `components.module.scss`.  
Optional size / float (also key-cascaded via `resolveDrawerRootVars`):
`--cmf-drawer-size`, `--cmf-drawer-size-{mobile|tablet|laptop|pc}`, `--cmf-drawer-inset`
→ runtime `--_cmf-drawer-size*` / `--_cmf-drawer-inset`.

Behavior defaults (Mantine props): `params.drawer` → `getDrawerDefaultProps()` → `Drawer.extend` + `AppDrawer`.
@see https://mantine.dev/core/drawer/?t=props

Tokens live on `:root` in `tokens/theme.scss` (portal inherits from `html`).  
**Never** put `--cmf-drawer-*` / `--cmf-tooltip-*` / `--cmf-popover-*` / `--cmf-modal-*` on
`[data-widget=sidebar|header]` — the floating panel is portaled and will not see them.

Scope attrs: `data-cmf-component` / `data-cmf-key` / `data-cmf-role`.

**Where to override by viewport / instance** — `tokens/theme.scss` `:root` + `@media`:

Prefer **only** `--cmf-drawer-layout-sidebar-size` in media (no need for `-size-tablet`).
Viewport nest: `size-{band}` (key) → **`size` (key)** → `size-{band}` (base) → `size`.

```scss
:root {
  --cmf-drawer-layout-sidebar-bg: transparent;
  --cmf-drawer-layout-sidebar-size: var(--app-layout-sidebar-width, 35vw);
}

@media (max-width: $tablet) {
  :root {
    --cmf-drawer-layout-sidebar-size: 90vw; /* enough — beats --cmf-drawer-size-tablet */
    --cmf-drawer-layout-sidebar-inset: var(--mantine-spacing-sm);
  }
}

@media (max-width: $mobile) {
  :root {
    --cmf-drawer-layout-sidebar-size: 80vw;
  }
}
```

Optional explicit band (wins over key `size`): `--cmf-drawer-layout-sidebar-size-tablet`.

Aside _widget_ tokens (`--aside-*`) stay in `tokens/widgets/sidebar/tokens.scss`.
`data-viewport` is on the drawer portal, not `[data-widget='sidebar']`.

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
--cmf-tooltip-sidebar-max-width: 12rem;
--cmf-tooltip-sidebar-item-max-width: 10rem;
```

ActionIcon uses `--cmf-action-icon-*`, prop **`size`**, and CMF **`padding`** → `--ai-padding`
(Mantine has no native AI padding; we paint it in `components.module.scss`).  
Button uses `--cmf-button-*` and **`height`** / **`padding-x`** / **`padding-y`** / **`fz`** / **`gap`** / **`justify`** / **`align`**
(section ↔ label; replaces Mantine section `margin-inline-*`).
Shorthand **`padding`** wins over axes; else `padding: var(--button-padding-y) var(--button-padding-x)`.
`--button-align` → `align-items` on the Button root + `.buttonInner` (cross-axis).

---

## Debug in DevTools

1. Select the control.
2. Check `data-cmf-component`, `data-cmf-key`, `data-variant`.
3. Read computed `--button-*` / `--ai-*` (or `--tooltip-*`) — values are nested `var(--cmf-…, …)` from JS.
4. Trace which `--cmf-*` token is defined on `[data-widget]` / `:root`.

If a key token does nothing: `data-cmf-key` ≠ token segment (e.g. API key `aside_header_logo` vs cascade key `logo`), or the token is unset.
