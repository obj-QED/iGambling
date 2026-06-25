import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';

/** Viewport width at or below the mobile breakpoint (≤767px). */
export function isMobileOnlyViewport(width: number): boolean {
  return width <= BREAKPOINTS_PX.mobile;
}

/** Viewport width in the tablet range (768–1024px). */
export function isTabletViewport(width: number): boolean {
  return width > BREAKPOINTS_PX.mobile && width <= BREAKPOINTS_PX.tablet;
}

/** Mobile or tablet — sidebar and other desktop-only chrome use this. */
export function isMobileViewport(width: number): boolean {
  return width <= BREAKPOINTS_PX.tablet;
}

export const IS_MOBILE_MEDIA_QUERY = `(max-width: ${BREAKPOINTS_PX.tablet}px)`;

export function readIsMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return isMobileViewport(window.innerWidth);
}
