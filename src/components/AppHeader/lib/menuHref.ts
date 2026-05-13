import { getAppHrefKind } from '@shared/lib';

/**
 * Backend sent a non-empty `url` string (navigation intent). Whitespace-only counts as absent.
 */
export function hasMenuItemUrl(raw: string | undefined): boolean {
  return Boolean(raw?.trim());
}

/**
 * Whether menu `url` from the backend should render as a real link (`AppLink`).
 * Uses {@link getAppHrefKind} on the string as received (after `trim`). Empty, `#`, `/#`,
 * protocol-relative `//…`, and `invalid` kinds are excluded.
 */
export function isNavigableMenuHref(hrefRaw: string | undefined): boolean {
  if (!hasMenuItemUrl(hrefRaw)) {
    return false;
  }
  const h = hrefRaw.trim();
  if (h === '/#') {
    return false;
  }
  if (/^\/\//.test(h)) {
    return false;
  }
  return getAppHrefKind(h) !== 'invalid';
}
