import { isRecord } from '@/shared/lib/coercion';
import { normalizeAppPathname } from '@/shared/lib/menu';

/** Fields that make `page.info` "present" for routing (empty `''` does not count). */
export const PAGE_INFO_PRESENCE_KEYS = ['title', 'description', 'name', 'content'] as const;

export type PageInfoPresenceKey = (typeof PAGE_INFO_PRESENCE_KEYS)[number];

function readNonEmptyInfoString(info: Record<string, unknown>, key: string): string | undefined {
  const value = info[key];
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

/** HTML body for CMS info pages (`page.info.content`). */
export function readPageInfoHtml(
  page: { readonly [key: string]: unknown } | undefined,
): string | undefined {
  if (page === undefined) return undefined;
  const info = page.info;
  if (!isRecord(info)) return undefined;
  return readNonEmptyInfoString(info, 'content');
}

export function readPageInfoTitle(
  page: { readonly [key: string]: unknown } | undefined,
): string | undefined {
  if (page === undefined) return undefined;
  const info = page.info;
  if (!isRecord(info)) return undefined;
  return readNonEmptyInfoString(info, 'title') ?? readNonEmptyInfoString(info, 'name') ?? undefined;
}

/** Stable content key for mask transitions (`page.url` from getPage / init). */
export function readPageUrl(
  page: { readonly [key: string]: unknown } | undefined,
): string | undefined {
  if (page === undefined) return undefined;
  const url = page.url;
  return typeof url === 'string' && url.trim().length > 0 ? url : undefined;
}

/**
 * True when `page.info` has at least one of title / description / name / content
 * as a non-empty string. Missing keys, `''`, and whitespace-only → empty.
 */
export function hasPageInfo(page: { readonly [key: string]: unknown } | undefined): boolean {
  if (page === undefined) return false;
  const info = page.info;
  if (!isRecord(info)) return false;
  for (const key of PAGE_INFO_PRESENCE_KEYS) {
    if (readNonEmptyInfoString(info, key) !== undefined) return true;
  }
  return false;
}

/**
 * Whether `page.url` refers to the active pathname.
 * Missing `url` → trust path-scoped hook data (mutation result already keyed by pathname).
 */
export function pageDataMatchesPath(
  page: { readonly [key: string]: unknown } | undefined,
  pathname: string,
): boolean {
  if (page === undefined) return false;
  const url = readPageUrl(page);
  if (url === undefined) return true;
  return normalizeAppPathname(url) === normalizeAppPathname(pathname.length > 0 ? pathname : '/');
}
