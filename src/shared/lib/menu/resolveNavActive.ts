import { getAppHrefKind, resolveItemHref } from '../href/resolveAppHref';

export type NavActiveMatch = 'exact' | 'prefix';

export type NavActiveSource = {
  url?: string;
  /** Explicit active from API/schema — overrides URL matching. */
  active?: boolean;
  /** When `false`, URL matching is skipped. Default: `true`. */
  matchRoute?: boolean;
  /** Internal route match mode. Default: `exact`. */
  activeMatch?: NavActiveMatch;
};

export function normalizeAppPathname(pathname: string): string {
  if (pathname.length === 0) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function matchInternalAppPath(
  pathname: string,
  href: string,
  mode: NavActiveMatch = 'exact',
): boolean {
  const current = normalizeAppPathname(pathname);
  const target = normalizeAppPathname(href);

  if (mode === 'prefix') {
    if (target === '/') return current === '/';
    return current === target || current.startsWith(`${target}/`);
  }

  return current === target;
}

/** Resolves nav active state: `active` prop → URL match (internal routes only). */
export function resolveNavActive(item: NavActiveSource, pathname: string): boolean {
  if (item.active !== undefined) return item.active;
  if (item.matchRoute === false) return false;

  const href = resolveItemHref(item.url);
  if (getAppHrefKind(href) !== 'internal') return false;

  return matchInternalAppPath(pathname, href, item.activeMatch ?? 'exact');
}
