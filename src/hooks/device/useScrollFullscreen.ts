import { useEffect, useRef } from 'react';

import { isScrollFullscreenEnabled } from '@/shared/config';
import {
  isDocumentFullscreen,
  readIsMobileViewport,
  tryScrollFullscreen,
} from '@/shared/lib/device';

/**
 * When `window.__SETTINGS__.params.fullscreen === true`, requests document
 * fullscreen on first scroll (mobile/tablet only).
 */
export function useScrollFullscreen(): void {
  const requestedRef = useRef(false);

  useEffect(() => {
    if (!isScrollFullscreenEnabled()) return undefined;
    if (!readIsMobileViewport()) return undefined;

    const onScroll = (): void => {
      if (requestedRef.current) return;
      if (isDocumentFullscreen()) {
        requestedRef.current = true;
        return;
      }

      if (window.scrollY < 1) return;

      requestedRef.current = true;
      void tryScrollFullscreen();
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
