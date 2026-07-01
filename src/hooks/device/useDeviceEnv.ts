import { useEffect, useState } from 'react';

import {
  type DeviceEnv,
  IS_MOBILE_MEDIA_QUERY,
  readDeviceEnv,
  subscribeFullscreenChange,
  syncDeviceBodyClasses,
} from '@/shared/lib/device';

/**
 * Reactive device environment: viewport, UA (ua-parser-js), fullscreen.
 * Keeps `<body>` classes in sync (`is-mobile`, `is-ios`, `is-browser-safari`, …).
 */
export function useDeviceEnv(): DeviceEnv {
  const [env, setEnv] = useState(readDeviceEnv);

  useEffect(() => {
    const mediaQuery = window.matchMedia(IS_MOBILE_MEDIA_QUERY);

    const sync = (): void => {
      const next = readDeviceEnv();
      setEnv(next);
      syncDeviceBodyClasses(next);
    };

    sync();
    mediaQuery.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    const unsubscribeFullscreen = subscribeFullscreenChange(sync);

    return () => {
      mediaQuery.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
      unsubscribeFullscreen();
    };
  }, []);

  return env;
}
