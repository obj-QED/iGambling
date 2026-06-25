import type { DeviceEnv } from './deviceEnv.types';

import { isDocumentFullscreen } from './fullscreen';
import { isMobileOnlyViewport, isMobileViewport, isTabletViewport } from './isMobileViewport';
import { parseUserAgent } from './parseUserAgent';

function readUserAgent(): string | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return navigator.userAgent;
}

function readViewportWidth(): number {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth;
}

function readIsFullscreen(): boolean {
  return isDocumentFullscreen();
}

/** Snapshot of device environment (SSR-safe defaults when `window` is absent). */
export function readDeviceEnv(userAgent = readUserAgent()): DeviceEnv {
  const width = readViewportWidth();
  const parsed = parseUserAgent(userAgent);

  return {
    isMobile: isMobileViewport(width),
    isMobileOnly: isMobileOnlyViewport(width),
    isTablet: isTabletViewport(width),
    isIOS: parsed.isIOS,
    isAndroid: parsed.isAndroid,
    browser: parsed.browser,
    isFullscreen: readIsFullscreen(),
  };
}
