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

## CMF — all Mantine components except Container

| Priority | Layer                         | CSS vars                                                   |
| -------- | ----------------------------- | ---------------------------------------------------------- |
| 1        | control+variant+component+key | `--cmf-button-{variant}-{component}-{key}-*`               |
| 2        | control+variant+component     | `--cmf-button-{variant}-{component}-*`                     |
| 3        | control+variant (base)        | `--cmf-button-{variant}-*`                                 |
| 4        | Mantine                       | fallbacks in `mantine/styles/_control-module-cascade.scss` |

Cascade resolved in CSS module (no `element.style`). Layers (`assets/styles/layer-order.css`): `reset → base → env → mantine → **mantine-rebase** → components → page → widget → **theme**`.

## Scrollbar

Global defaults: `--cmf-scrollbar-*` in `tokens/global/cmf-mantine-base-tokens.scss`.

Mixin: `assets/styles/mixins/_scrollbar.scss` → `@include cmf-scrollbar('aside-scrollbar')`.

Per-block override: set `--{prefix}-scrollbar-*` on scope (e.g. aside uses `--aside-scrollbar-*`).

New widgets: `yarn scaffold widget:MyWidget` — creates `tokens/widgets/{kebab}/` and patches this file.
