/**
 * Breakpoints — single source of truth (px).
 *
 * - Mantine theme consumes the `em` values (see breakpointsEm).
 * - SCSS gets `$mobile/$tablet/$laptop/$pc` (px) injected into every file via
 *   vite.config `css.preprocessorOptions.scss.additionalData`, so any *.scss /
 *   *.module.scss can use `@media (max-width: $tablet) { ... }`.
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
