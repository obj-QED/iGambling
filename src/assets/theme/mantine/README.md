# Mantine bridge

Thin integration between **CSS tokens** (`tokens/`) and **@mantine/core**.

## Layout

```txt
mantine/
├── index.ts             # public barrel — prefer `@/assets/theme`
├── theme/
│   ├── mantineTheme.ts  # createTheme
│   └── gradientTokens.ts
├── brand/
│   ├── brandPalette.ts
│   └── brand-palette.scss
├── components/
│   └── components.ts    # Mantine component extensions (CMF cascade)
├── cmf/                 # registry, cascade resolve, size/variant unions
├── vars/                # per-control Mantine `vars` resolvers
├── styles/              # global states + components.module.scss
└── types/               # Mantine prop augmentation (.d.ts)
```

Widget shell styles (header surface, aside scroll) live in `widgets/*/styles/`, not here.

## Imports

| Need                             | Import                                   |
| -------------------------------- | ---------------------------------------- |
| Theme config, CMF sizes/variants | `@/assets/theme`                         |
| Internal cascade / vars          | `@/assets/theme/mantine/cmf/*`, `vars/*` |

## CMF cascade (priority)

1. `cmf-component-key-{ctrl}` — `data-menu-key`
2. `cmf-component-{ctrl}` — `data-cmf-component`
3. `cmf-{ctrl}` — `:root` (`tokens/global/`)
4. Mantine fallbacks — `vars/*Vars.ts`
