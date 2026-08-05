# Theme

## Layout

```txt
theme/
├── tokens/              # CSS variables — single source of truth
│   ├── theme.scss       # entry (imported by src/assets/index.scss)
│   ├── global/          # CMF base, icons, controls registry
│   └── widgets/         # per-widget scopes
│       └── header/      # [data-widget='header'] — size / surface / button / action-icon
├── mantine/             # Mantine bridge — see mantine/README.md
│   ├── index.ts         # public barrel
│   ├── theme/           # mantineTheme, gradientTokens
│   ├── brand/           # brandPalette + brand-palette.scss
│   ├── components/      # Mantine component extensions
│   ├── cmf/             # cascade, registry, unions
│   ├── vars/            # Mantine vars resolvers
│   ├── styles/          # global component states
│   └── types/           # .d.ts augmentation
├── breakpoints.ts       # shared breakpoints (px + em)
└── index.ts             # public TS surface (mantineTheme)
```

**Do not** add `@forward` stubs under `tokens/` root — import from `tokens/global/` directly.

## CMF — Button / ActionIcon (except Container)

Runtime: theme `vars()` **clear** Mantine inline → **`nestCssVars`** from `data-cmf-*` + `data-variant` (`cmf/CASCADE.md`).

| Priority | Layer            | CSS vars                                |
| -------- | ---------------- | --------------------------------------- |
| 1        | component + key  | `--cmf-button-{component}-{key}-*`      |
| 2        | component + role | `--cmf-button-{component}-{role}-*`     |
| 3        | component        | `--cmf-button-{component}-*`            |
| 4        | variant          | `--cmf-button-{variant}-*`              |
| 5        | shared / Mantine | `--cmf-button-*` / size table fallbacks |

CSS `@layer` order (`assets/styles/layer-order.css`): `reset → base → env → mantine → **mantine-rebase** → components → page → widget → **theme**.

## Scrollbar

Global defaults: `--cmf-scrollbar-*` in `tokens/global/cmf-mantine-base-tokens.scss`.

Mixin: `assets/styles/mixins/_scrollbar.scss` → `@include cmf-scrollbar('aside-scrollbar')`.

Per-block override: set `--{prefix}-scrollbar-*` on scope (e.g. aside uses `--aside-scrollbar-*`).

New widgets: `yarn scaffold widget:MyWidget` — creates `tokens/widgets/{kebab}/` and patches this file.
