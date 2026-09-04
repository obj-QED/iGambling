import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';
import { readBreakpointsPx } from '@/assets/theme/readBreakpointsPx';

/** Viewport width at or below the mobile breakpoint. */
export function isMobileOnlyViewport(width: number): boolean {
  return width <= readBreakpointsPx().mobile;
}

/** Viewport width in the tablet band (above mobile, at or below tablet). */
export function isTabletViewport(width: number): boolean {
  const { mobile, tablet } = readBreakpointsPx();
  return width > mobile && width <= tablet;
}

/** Mobile or tablet — sidebar and other desktop-only chrome use this. */
export function isMobileViewport(width: number): boolean {
  return width <= readBreakpointsPx().tablet;
}

/** matchMedia query for layout chrome — prefers theme `--breakpoint-tablet`. */
export function getIsMobileMediaQuery(): string {
  return `(max-width: ${readBreakpointsPx().tablet}px)`;
}

/**
 * @deprecated Prefer `getIsMobileMediaQuery()` — fixed at module load from
 * `BREAKPOINTS_PX` (ignores theme CSS vars).
 */
export const IS_MOBILE_MEDIA_QUERY = `(max-width: ${BREAKPOINTS_PX.tablet}px)`;

export function readIsMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return isMobileViewport(window.innerWidth);
}
