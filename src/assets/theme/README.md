# Theme

Theme is split by concern:

- `tokens/` — design tokens (CSS variables). **Single source of truth.** Files
  here are concatenated into **dist/theme.css** during build (alphabetical by
  filename). `.css` and `.scss` are supported; `*.module.*` files are ignored.
- `mantine/` — Mantine integration: `mantineTheme.ts` (thin bridge → tokens),
  `components.ts` + `components.module.scss` (per-component styles).
- `index.ts` — public surface. Import `mantineTheme`, `defaultColorScheme`,
  `classNamesPrefix` from `@/assets/theme`.

On the server, you can replace or edit `dist/theme.css` to override theme tokens
without rebuilding.
