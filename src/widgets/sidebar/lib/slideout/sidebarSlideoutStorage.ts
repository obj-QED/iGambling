/** Persist keys for expand/collapse shells that share the slideout provider. */
export type SidebarExpandPersistMode = 'slideout' | 'slidein';

const STORAGE_KEYS: Record<SidebarExpandPersistMode, string> = {
  slideout: 'igambling:sidebar:slideout-expanded',
  slidein: 'igambling:sidebar:slidein-expanded',
};

/** First visit / missing key → expanded (open). */
export const SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT = true;

/** Persisted open/closed; missing → `fallback` (default open). */
export function readSidebarSlideoutExpanded(
  fallback: boolean = SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT,
  mode: SidebarExpandPersistMode = 'slideout',
): boolean {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS[mode]);
    if (raw === null) return fallback;
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return fallback;
  } catch {
    return fallback;
  }
}

export function writeSidebarSlideoutExpanded(
  expanded: boolean,
  mode: SidebarExpandPersistMode = 'slideout',
): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEYS[mode], expanded ? 'true' : 'false');
  } catch {
    /* private mode / quota — ignore */
  }
}
