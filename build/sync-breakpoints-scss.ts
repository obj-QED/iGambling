import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { BREAKPOINTS_PX } from '../src/assets/theme/breakpoints.ts';

const OUT = fileURLToPath(new URL('../src/assets/theme/breakpoints.scss', import.meta.url));

/**
 * Write `breakpoints.scss` from `breakpoints.ts` (single numeric SoT).
 * Called from Vite config so `@media ($tablet)` and `--breakpoint-*` (#{$…})
 * cannot drift from JS / Mantine.
 */
export function syncBreakpointsScss(): void {
  const next = `// AUTO-GENERATED from breakpoints.ts — edit that file, not this one.
// Runtime JS: theme.scss \`--breakpoint-*\` ← these vars. Mantine: breakpointsEm.

$mobile: ${BREAKPOINTS_PX.mobile}px;
$tablet: ${BREAKPOINTS_PX.tablet}px;
$laptop: ${BREAKPOINTS_PX.laptop}px;
$pc: ${BREAKPOINTS_PX.pc}px;
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
