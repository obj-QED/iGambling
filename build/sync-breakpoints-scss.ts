import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SCSS = fileURLToPath(new URL('../src/assets/theme/breakpoints.scss', import.meta.url));
const OUT = fileURLToPath(new URL('../src/assets/theme/breakpoints.values.ts', import.meta.url));

const BREAKPOINT_NAMES = ['mobile', 'tablet', 'laptop', 'pc'] as const;

export type BreakpointPxMap = Record<(typeof BREAKPOINT_NAMES)[number], number>;

/** Parse `$tablet: 1040px;` lines from the Sass SoT. */
export function parseBreakpointsScss(source: string): BreakpointPxMap {
  const resolved = {} as BreakpointPxMap;
  for (const name of BREAKPOINT_NAMES) {
    const match = new RegExp(`\\$${name}:\\s*(-?\\d+(?:\\.\\d+)?)px\\s*;`, 'm').exec(source);
    if (match === null) {
      throw new Error(`[sync-breakpoints] Missing $${name}: <n>px; in breakpoints.scss`);
    }
    resolved[name] = Number(match[1]);
  }
  return resolved;
}

/**
 * Read `breakpoints.scss` (human SoT) → write `breakpoints.values.ts` for JS / Mantine.
 * Called from Vite / Storybook so `BREAKPOINTS_PX` cannot drift from `$tablet`.
 */
export function syncBreakpointsFromScss(): void {
  const source = readFileSync(SCSS, 'utf8');
  const px = parseBreakpointsScss(source);
  const next = `/* AUTO-GENERATED from breakpoints.scss — edit that file, not this one. */
export const BREAKPOINTS_PX = {
  mobile: ${px.mobile},
  tablet: ${px.tablet},
  laptop: ${px.laptop},
  pc: ${px.pc},
} as const;
`;

  let prev = '';
  try {
    prev = readFileSync(OUT, 'utf8');
  } catch {
    /* first run */
  }
  if (prev === next) return;
  writeFileSync(OUT, next);
}
