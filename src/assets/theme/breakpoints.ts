/**
 * Breakpoint helpers for JS / Mantine.
 *
 * **Numeric SoT:** `breakpoints.scss` (`$mobile` / `$tablet` / …).
 * Vite/Storybook sync → `breakpoints.values.ts` → `BREAKPOINTS_PX` here.
 * Runtime chrome also reads `theme.scss` `--breakpoint-*` (`#{$tablet}`, …).
 */
import { BREAKPOINTS_PX } from './breakpoints.values';

export { BREAKPOINTS_PX };

export type BreakpointName = keyof typeof BREAKPOINTS_PX;

/** Convert px to em string (Mantine recommends em breakpoints). */
export const pxToEm = (px: number, base = 16): string => `${px / base}em`;

/** em breakpoints derived from BREAKPOINTS_PX — used by the Mantine theme. */
export const breakpointsEm = Object.fromEntries(
  Object.entries(BREAKPOINTS_PX).map(([name, px]) => [name, pxToEm(px)]),
) as Record<BreakpointName, string>;
