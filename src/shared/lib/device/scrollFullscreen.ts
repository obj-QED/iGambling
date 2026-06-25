import { getSettings, isScrollFullscreenEnabled } from '@/shared/config';

import { isDocumentFullscreen, requestDocumentFullscreen } from './fullscreen';
import { readIsMobileViewport } from './isMobileViewport';

/** Minimum vertical scroll before requesting fullscreen. */
export const SCROLL_FULLSCREEN_THRESHOLD_PX = 8;

export function shouldRequestScrollFullscreen(options?: {
  enabled?: boolean;
  isMobile?: boolean;
  scrollY?: number;
  isFullscreen?: boolean;
}): boolean {
  const enabled = options?.enabled ?? isScrollFullscreenEnabled(getSettings());
  if (!enabled) return false;

  const isMobile = options?.isMobile ?? readIsMobileViewport();
  if (!isMobile) return false;

  const isFullscreen = options?.isFullscreen ?? isDocumentFullscreen();
  if (isFullscreen) return false;

  const scrollY = options?.scrollY ?? (typeof window !== 'undefined' ? window.scrollY : 0);
  return scrollY >= SCROLL_FULLSCREEN_THRESHOLD_PX;
}

export async function tryScrollFullscreen(options?: {
  enabled?: boolean;
  isMobile?: boolean;
  scrollY?: number;
}): Promise<boolean> {
  if (!shouldRequestScrollFullscreen(options)) return false;
  return requestDocumentFullscreen();
}
