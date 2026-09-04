import type { AppDrawerViewport } from '../types/props.types';

import { readBreakpointsPx } from '@/assets/theme/readBreakpointsPx';

/**
 * Map viewport width → breakpoint band for `data-viewport`.
 * SoT: theme `--breakpoint-*` via `readBreakpointsPx()`, else `BREAKPOINTS_PX`.
 */
export function resolveAppDrawerViewport(width: number): AppDrawerViewport {
  const { mobile, tablet, laptop } = readBreakpointsPx();
  if (width <= mobile) {
    return 'mobile';
  }
  if (width <= tablet) {
    return 'tablet';
  }
  if (width <= laptop) {
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
