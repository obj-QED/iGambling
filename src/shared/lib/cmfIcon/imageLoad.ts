/** 1×1 GIF — real browsers expose naturalWidth synchronously; jsdom stays 0. */
const PROBE_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

let naturalSizeReliable: boolean | undefined;

/**
 * jsdom reports `complete && naturalWidth === 0` for every image.
 * Cached 404s in a real browser look the same — only trust the check when
 * a data-URL probe has a non-zero intrinsic size.
 */
export function htmlImageNaturalSizeIsReliable(): boolean {
  if (naturalSizeReliable !== undefined) {
    return naturalSizeReliable;
  }
  if (typeof Image === 'undefined') {
    naturalSizeReliable = false;
    return false;
  }

  const probe = new Image();
  probe.src = PROBE_PIXEL;
  if (!probe.complete) {
    naturalSizeReliable = true;
    return true;
  }

  naturalSizeReliable = probe.naturalWidth > 0;
  return naturalSizeReliable;
}

/** Cached / already-failed `<img>`: `onError` often never fires. */
export function isBrokenHtmlImage(
  img: Pick<HTMLImageElement, 'src' | 'complete' | 'naturalWidth'>,
): boolean {
  if (img.src.length === 0) {
    return false;
  }
  return img.complete && img.naturalWidth === 0;
}
