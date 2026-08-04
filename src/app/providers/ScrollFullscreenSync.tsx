import { useScrollFullscreen } from '@hooks/useScrollFullscreen';

/** Scroll → fullscreen when enabled in `window.__SETTINGS__.params.fullscreen`. */
export function ScrollFullscreenSync() {
  useScrollFullscreen();
  return null;
}

ScrollFullscreenSync.displayName = 'ScrollFullscreenSync';
