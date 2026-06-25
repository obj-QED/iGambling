import type { DeviceBrowserSlug } from './parseUserAgent';

/** Runtime device environment — viewport, UA (ua-parser-js), fullscreen. */
export type DeviceEnv = {
  /** Viewport ≤ tablet breakpoint (layout chrome). */
  isMobile: boolean;
  /** Viewport ≤ mobile breakpoint. */
  isMobileOnly: boolean;
  /** Viewport in tablet range. */
  isTablet: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  browser: DeviceBrowserSlug;
  isFullscreen: boolean;
};
