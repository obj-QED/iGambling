import { normalizeAppPathname } from '@/shared/lib/menu';

/**
 * Extra allowlist paths beyond menus from init/getPage.
 * Add special app routes here as they ship.
 */
export const EXTRA_KNOWN_APP_PATHS = [
  // '/some-special',
] as const;

/**
 * @deprecated Prefer menu allowlist + lobby shell for paths without `page.info`.
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
