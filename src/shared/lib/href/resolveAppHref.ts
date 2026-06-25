/**
 * Classifies string href values for client routing and external links.
 *
 * Rendering contract:
 * - **external** → native `<a target="_blank" rel="noopener noreferrer">`
 * - **internal** → `react-router` `Link` (`to` is an app path)
 * - **hash** → native `<a href="#…">` (same-document fragment; avoids router rewriting)
 * - **invalid** → non-navigating control (`data-invalid-href` / disabled)
 */
export type AppHrefKind = 'external' | 'internal' | 'hash' | 'invalid';

export function getAppHrefKind(href: string): AppHrefKind {
  const h = href.trim();
  if (h.length === 0) return 'invalid';
  if (/^\/\//.test(h)) return 'invalid';
  if (/^https?:\/\//i.test(h)) return 'external';
  if (h.startsWith('#')) {
    return h.length > 1 ? 'hash' : 'invalid';
  }
  if (h.startsWith('/')) {
    if (h === '/#') return 'invalid';
    return 'internal';
  }
  return 'invalid';
}

/** True when {@link getAppHrefKind} is not `invalid` (after trim rules inside `getAppHrefKind`). */
export function isValidAppHref(href: string): boolean {
  return getAppHrefKind(href) !== 'invalid';
}
