import type { DeviceEnv } from './deviceEnv.types';

/** True when viewport / UA / fullscreen flags are unchanged (ignore object identity). */
export function deviceEnvEqual(a: DeviceEnv, b: DeviceEnv): boolean {
  return (
    a.isMobile === b.isMobile &&
    a.isMobileOnly === b.isMobileOnly &&
    a.isTablet === b.isTablet &&
    a.isIOS === b.isIOS &&
    a.isAndroid === b.isAndroid &&
    a.browser === b.browser &&
    a.isFullscreen === b.isFullscreen
  );
}
