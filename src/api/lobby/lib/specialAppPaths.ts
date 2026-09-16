import { normalizeAppPathname } from '@/shared/lib/menu';

/**
 * Extra discovery paths for Spotlight (beyond menus / page.url from API).
 * Not a hard router gate — InfoPage existence is decided by init/getPage.
 */
export const EXTRA_KNOWN_APP_PATHS = [
  // '/some-special',
] as const;

/**
 * @deprecated Prefer API page payload for shells without `page.info`.
 * Kept for explicit feature shells if needed later.
 */
export const SPECIAL_APP_PATHS_WITHOUT_INFO = [
  // '/jackpots',
] as const;

function toPathSet(paths: readonly string[]): ReadonlySet<string> {
  const out = new Set<string>();
  for (const path of paths) {
    out.add(normalizeAppPathname(path));
  }
  return out;
}

export const EXTRA_KNOWN_APP_PATH_SET: ReadonlySet<string> = toPathSet(EXTRA_KNOWN_APP_PATHS);
export const SPECIAL_APP_PATHS_WITHOUT_INFO_SET: ReadonlySet<string> = toPathSet(
  SPECIAL_APP_PATHS_WITHOUT_INFO,
);

export function isExtraKnownAppPath(pathname: string): boolean {
  return EXTRA_KNOWN_APP_PATH_SET.has(normalizeAppPathname(pathname));
}

export function isSpecialAppPathWithoutInfo(pathname: string): boolean {
  return SPECIAL_APP_PATHS_WITHOUT_INFO_SET.has(normalizeAppPathname(pathname));
}
