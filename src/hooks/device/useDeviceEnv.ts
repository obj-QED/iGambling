import { useEffect, useState } from 'react';

import {
  type DeviceEnv,
  deviceEnvEqual,
  getIsMobileMediaQuery,
  readDeviceEnv,
  subscribeFullscreenChange,
  syncDeviceBodyClasses,
} from '@/shared/lib/device';

/**
 * Reactive device environment: viewport, UA (ua-parser-js), fullscreen.
 * Keeps `<body>` classes in sync (`is-mobile`, `is-ios`, `is-browser-safari`, …).
 *
 * Modal scroll-lock often fires `resize` (scrollbar width). We only commit state
 * when flags actually change — otherwise AppLayout / header / sidebar re-render.
 */
export function useDeviceEnv(): DeviceEnv {
  const [env, setEnv] = useState(readDeviceEnv);

  useEffect(() => {
    const mediaQuery = window.matchMedia(getIsMobileMediaQuery());

    const sync = (): void => {
      const next = readDeviceEnv();
      setEnv((prev) => {
        if (deviceEnvEqual(prev, next)) return prev;
        syncDeviceBodyClasses(next);
        return next;
      });
    };

    sync();
    mediaQuery.addEventListener('change', sync);
    // Breakpoint edges between mobile/tablet still need width samples.
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
