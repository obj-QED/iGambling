/**
 * Breakpoint fallbacks (px) + build-time SoT for SCSS / Mantine.
 *
 * Runtime chrome (`useIsMobile`, drawer `data-viewport`) prefers CSS vars from
 * `tokens/theme.scss` (`--breakpoint-*`) via `readBreakpointsPx()` — then this map.
 *
 * Keep numbers aligned with theme.scss so `@media ($tablet)` and JS stay in sync.
 *
 * - SCSS: `$mobile/$tablet/$laptop/$pc` via `build/scss-config.ts`
 * - Mantine: `breakpointsEm` in `mantineTheme.ts`
 */
export const BREAKPOINTS_PX = {
  mobile: 767,
  tablet: 1024,
  laptop: 1440,
  pc: 1441,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS_PX;

/** Convert px to em string (Mantine recommends em breakpoints). */
export const pxToEm = (px: number, base = 16): string => `${px / base}em`;

/** em breakpoints derived from BREAKPOINTS_PX — used by the Mantine theme. */
export const breakpointsEm = Object.fromEntries(
  Object.entries(BREAKPOINTS_PX).map(([name, px]) => [name, pxToEm(px)]),
) as Record<BreakpointName, string>;
