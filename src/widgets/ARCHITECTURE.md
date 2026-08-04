# Widgets — Schema Driven UI

Data boundary: **untrusted init/settings → DTO → domain → schema → UI**.

## Platform pipeline

```mermaid
flowchart TD
  api[PHP_API] --> normalize[normalize_menu]
  settings["window.__SETTINGS__"] --> resolve
  brand[brand_optional] --> resolve
  page[page_optional] --> resolve
  props[props_overrides] --> resolve
  defaults[widget_defaults] --> resolve[resolveWidgetSchema]
  resolve --> schema[WidgetSchema]
  schema --> layoutReg[layoutRegistry_sync]
  layoutReg --> blockReg[blockRegistry_sync]
  blockReg --> adapterReg[adapter_lazy]
  adapterReg --> wrapperReg[wrapperRegistry_lazy]
  wrapperReg --> entity[entity]
  entity --> sharedUi[shared_ui]
  theme[Theme_CSS_vars] -.-> sharedUi
```

## Separation

| Source                                      | Owns                                               |
| ------------------------------------------- | -------------------------------------------------- |
| Theme (`src/assets/theme/**`)               | colors, spacing, radius, fonts, sizes              |
| Settings (`window.__SETTINGS__`)            | behavior, layout, variants, wrappers, capabilities |
| API                                         | menu / content data                                |
| Schema (`shared/schema` + `resolve*Schema`) | merged contract passed as props                    |

## Shared schema core

- [`src/shared/schema/`](../shared/schema/) — `resolveWidgetSchema`, `mergeSchemaLayers`, capabilities helpers
- Inheritance: `defaults → global → brand → page → props` (brand/page optional)
- Wrappers: [`src/shared/ui/overlay/`](../shared/ui/overlay/) — `WRAPPER_REGISTRY` (lazy by mode)

## Header (reference)

```txt
useAppLayout → resolveHeaderSchema → AppHeader(menu, config/schema)
  → typePack Strategy (sync)
  → layoutRegistry (sync)
  → blockRegistry (sync)
  → plugin adapters (lazy) + wrapperRegistry
```

**Current migration state**

| Layer                                       | Status               |
| ------------------------------------------- | -------------------- |
| `shared/schema` + overlay wrappers          | shipped              |
| `resolveHeaderSchema` / HeaderSchema fields | shipped              |
| typePacks (layout strategy)                 | active               |
| `plugins/` + `runtime/` lazy adapters       | wallet/search seeded |
| Full Header Engine v4 (`engine/` singleton) | deferred             |

Blocks must not call `getSettings()` — only resolved schema via props/context.

## Sidebar / banner / footer

Same contract: `resolve*Schema` in app layout, widgets receive `menu`/`content` + `schema` only.

## SCSS

See `.cursor/rules/header-scss-guard.mdc` — tokens and paint only; no layout logic in CSS.
