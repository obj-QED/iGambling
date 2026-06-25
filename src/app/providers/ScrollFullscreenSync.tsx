import { useScrollFullscreen } from '@hooks/useScrollFullscreen';

/** Scroll → fullscreen when enabled in `window.__SETTINGS__.params.fullWidth`. */
export function ScrollFullscreenSync() {
  useScrollFullscreen();
  return null;
}

ScrollFullscreenSync.displayName = 'ScrollFullscreenSync';
