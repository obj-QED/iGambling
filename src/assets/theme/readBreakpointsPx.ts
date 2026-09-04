import type { BreakpointName } from './breakpoints';

import { BREAKPOINTS_PX } from './breakpoints';

/** CSS custom properties on `:root` — SoT in `tokens/theme.scss`. */
export const BREAKPOINT_CSS_VARS = {
  mobile: '--breakpoint-mobile',
  tablet: '--breakpoint-tablet',
  laptop: '--breakpoint-laptop',
  pc: '--breakpoint-pc',
} as const satisfies Record<BreakpointName, `--breakpoint-${BreakpointName}`>;

const BREAKPOINT_NAMES = Object.keys(BREAKPOINTS_PX) as BreakpointName[];

/** Parse `767px` / `767` from `getComputedStyle`. */
export function parseBreakpointPx(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  const match = /^(-?\d*\.?\d+)(?:px)?$/i.exec(trimmed);
  if (match === null) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function defaultBreakpointRoot(): Element | null {
  if (typeof document === 'undefined') return null;
  return document.documentElement;
}

/**
 * Resolved breakpoints: `theme.scss` CSS vars first, then `BREAKPOINTS_PX`.
 * Used by layout chrome (`useIsMobile`, drawer viewport). SCSS `@media` / Mantine
 * still compile from `BREAKPOINTS_PX` — keep those defaults aligned with theme.
 */
export function readBreakpointsPx(
  root: Element | null = defaultBreakpointRoot(),
): Record<BreakpointName, number> {
  const resolved: Record<BreakpointName, number> = { ...BREAKPOINTS_PX };
  if (!root) {
    return resolved;
  }

  const styles = getComputedStyle(root);
  for (const name of BREAKPOINT_NAMES) {
    const parsed = parseBreakpointPx(styles.getPropertyValue(BREAKPOINT_CSS_VARS[name]));
    if (parsed !== null) {
      resolved[name] = parsed;
    }
  }
  return resolved;
}
