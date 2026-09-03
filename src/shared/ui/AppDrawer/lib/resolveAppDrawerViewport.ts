import type { AppDrawerViewport } from '../types/props.types';

import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';

/**
 * Map viewport width → breakpoint band for `data-viewport`.
 * SoT: `BREAKPOINTS_PX` (mobile ≤767, tablet ≤1024, laptop ≤1440, else pc).
 */
export function resolveAppDrawerViewport(width: number): AppDrawerViewport {
  if (width <= BREAKPOINTS_PX.mobile) {
    return 'mobile';
  }
  if (width <= BREAKPOINTS_PX.tablet) {
    return 'tablet';
  }
  if (width <= BREAKPOINTS_PX.laptop) {
    return 'laptop';
  }
  return 'pc';
}

export function readAppDrawerViewport(): AppDrawerViewport {
  if (typeof window === 'undefined') {
    return 'pc';
  }
  return resolveAppDrawerViewport(window.innerWidth);
}
