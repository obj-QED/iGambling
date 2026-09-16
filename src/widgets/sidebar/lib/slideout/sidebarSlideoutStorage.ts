const STORAGE_KEY = 'igambling:sidebar:slideout-expanded';

/** First visit / missing key → expanded (open). */
export const SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT = true;

/** Persisted open/closed; missing → `fallback` (default open). */
export function readSidebarSlideoutExpanded(
  fallback: boolean = SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT,
): boolean {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return fallback;
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return fallback;
  } catch {
    return fallback;
  }
}

export function writeSidebarSlideoutExpanded(expanded: boolean): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, expanded ? 'true' : 'false');
  } catch {
    /* private mode / quota — ignore */
  }
}
