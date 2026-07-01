# Theme

## Layout

```txt
theme/
├── tokens/              # CSS variables — single source of truth
│   ├── theme.scss       # entry (imported by src/assets/index.scss)
│   ├── global/          # CMF base, icons, controls registry
│   └── widgets/         # per-widget overrides (header, sidebar, …)
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

| Priority | Layer                    | CSS vars                     | Where                            |
| -------- | ------------------------ | ---------------------------- | -------------------------------- |
| 1        | cmf-component-key-{ctrl} | `--cmf-{loc}-{key}-{slug}-*` | `tokens/widgets/{loc}/cmf*.scss` |
| 2        | cmf-component-{ctrl}     | `--cmf-{loc}-{slug}-*`       | same                             |
| 3        | cmf-{ctrl} (base)        | `--cmf-{slug}-*`             | `:root` (`tokens/global/`)       |
| 4        | Mantine                  | fallbacks                    | `mantine/vars/*Vars.ts`          |

## Scrollbar

Global defaults: `--cmf-scrollbar-*` in `tokens/global/cmf-mantine-base-tokens.scss`.

Mixin: `assets/styles/mixins/_scrollbar.scss` → `@include cmf-scrollbar('aside-scrollbar')`.

Per-block override: set `--{prefix}-scrollbar-*` on scope (e.g. aside uses `--aside-scrollbar-*`).
