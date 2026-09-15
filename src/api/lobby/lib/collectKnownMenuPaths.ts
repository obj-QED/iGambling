import { isRecord, readString } from '@/shared/lib/coercion';
import { normalizeAppPathname } from '@/shared/lib/menu';

/** Block types whose nested menu URLs define navigable app pages. */
export const KNOWN_ROUTE_BLOCK_TYPES = ['menuHeaderTop', 'menuHeader', 'footer'] as const;

export type KnownRouteBlockType = (typeof KNOWN_ROUTE_BLOCK_TYPES)[number];

const KNOWN_ROUTE_BLOCK_TYPE_SET: ReadonlySet<string> = new Set(KNOWN_ROUTE_BLOCK_TYPES);

/**
 * Normalize a menu `url` to an internal pathname for allowlisting.
 * Relative API urls (`tag/new`, `provider/x`) get a leading `/`.
 */
export function normalizeMenuRoutePath(raw: string | undefined): string | null {
  if (raw == null) return null;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  if (trimmed === '#' || trimmed.startsWith('#')) return null;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')) return null;
  if (/^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) return null;

  const withoutHash = trimmed.split('#')[0] ?? trimmed;
  const pathPart = (withoutHash.split('?')[0] ?? withoutHash).trim();
  if (pathPart.length === 0 || pathPart === '#') return null;

  // Non-path menu actions (search triggers, named shells without a path)
  if (!pathPart.includes('/') && !pathPart.startsWith('/')) {
    if (pathPart === 'search' || pathPart === 'gamesMenu') return null;
  }

  const withSlash = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  return normalizeAppPathname(withSlash);
}

/** Recursively collect every navigable `url` from menu trees (`items` / nested `menu`). */
export function collectUrlsFromMenuTree(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    for (const entry of node) collectUrlsFromMenuTree(entry, out);
    return;
  }
  if (!isRecord(node)) return;

  const path = normalizeMenuRoutePath(readString(node.url));
  if (path !== null) out.add(path);

  if (Array.isArray(node.items)) {
    collectUrlsFromMenuTree(node.items, out);
  }
  if (Array.isArray(node.menu)) {
    collectUrlsFromMenuTree(node.menu, out);
  }
}

function collectUrlsFromFooterBlock(block: Record<string, unknown>, out: Set<string>): void {
  if (Array.isArray(block.menu)) {
    collectUrlsFromMenuTree(block.menu, out);
  }
  if (!Array.isArray(block.blocks)) return;
  for (const nested of block.blocks) {
    if (!isRecord(nested)) continue;
    if (Array.isArray(nested.menu)) {
      collectUrlsFromMenuTree(nested.menu, out);
    }
    if (Array.isArray(nested.list)) {
      for (const row of nested.list) {
        if (!isRecord(row)) continue;
        const path = normalizeMenuRoutePath(readString(row.url));
        if (path !== null) out.add(path);
      }
    }
  }
}

/**
 * Paths allowed by lobby chrome from `initV2` / `getPage` `page`:
 * - `page.blocks[]` where `type` ∈ menuHeaderTop | menuHeader | footer
 * - `page.menu` (aside / gamesMenu / footer roots, etc.)
 */
export function collectKnownMenuPaths(page: unknown): ReadonlySet<string> {
  const out = new Set<string>(['/']);
  if (!isRecord(page)) return out;

  if (Array.isArray(page.blocks)) {
    for (const block of page.blocks) {
      if (!isRecord(block)) continue;
      const type = readString(block.type);
      if (type === undefined || !KNOWN_ROUTE_BLOCK_TYPE_SET.has(type)) continue;

      if (type === 'footer') {
        collectUrlsFromFooterBlock(block, out);
        continue;
      }

      // menuHeaderTop / menuHeader
      if (Array.isArray(block.menu)) {
        collectUrlsFromMenuTree(block.menu, out);
      }
    }
  }

  if (Array.isArray(page.menu)) {
    collectUrlsFromMenuTree(page.menu, out);
  }

  return out;
}

export function isPathInKnownMenuPaths(pathname: string, known: ReadonlySet<string>): boolean {
  const normalized = normalizeAppPathname(pathname.length > 0 ? pathname : '/');
  return known.has(normalized);
}

/** Merge helper when the envelope is `content` with optional `page`. */
export function collectKnownMenuPathsFromInitContent(content: unknown): ReadonlySet<string> {
  if (!isRecord(content)) return new Set<string>(['/']);
  return collectKnownMenuPaths(content.page);
}
