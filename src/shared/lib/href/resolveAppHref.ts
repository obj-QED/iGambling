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

/** Menu/API url as-is from backend (`undefined` → `''`). No trim or path rewriting. */
export function resolveItemHref(url: string | undefined): string {
  return url ?? '';
}

export function getAppHrefKind(href: string): AppHrefKind {
  if (href.length === 0) return 'invalid';
  if (/^\/\//.test(href)) return 'invalid';
  if (/^https?:\/\//i.test(href)) return 'external';
  if (href.startsWith('#')) {
    return href.length > 1 ? 'hash' : 'invalid';
  }
  if (href.startsWith('/')) {
    if (href === '/#') return 'invalid';
    return 'internal';
  }
  return 'invalid';
}

/** True when {@link getAppHrefKind} is not `invalid`. */
export function isValidAppHref(href: string): boolean {
  return getAppHrefKind(href) !== 'invalid';
}
