import { isRecord, readString } from '@/shared/lib/coercion';
import { normalizeAppPathname } from '@/shared/lib/menu';

/** Block types whose nested menu URLs define navigable app pages. */
export const KNOWN_ROUTE_BLOCK_TYPES = ['menuHeaderTop', 'menuHeader', 'footer'] as const;

export type KnownRouteBlockType = (typeof KNOWN_ROUTE_BLOCK_TYPES)[number];

const KNOWN_ROUTE_BLOCK_TYPE_SET: ReadonlySet<string> = new Set(KNOWN_ROUTE_BLOCK_TYPES);

export type KnownMenuPathCatalog = {
  paths: ReadonlySet<string>;
  /** First non-empty `name` per path from menu trees. */
  labels: ReadonlyMap<string, string>;
};

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

function rememberPath(
  path: string,
  name: string | undefined,
  out: Set<string>,
  labels: Map<string, string>,
): void {
  out.add(path);
  if (name === undefined) return;
  const trimmed = name.trim();
  if (trimmed.length === 0 || labels.has(path)) return;
  labels.set(path, trimmed);
}

function readMenuNodePath(node: Record<string, unknown>): string | null {
  return normalizeMenuRoutePath(readString(node.url) || readString(node.href));
}

/** Recursively collect every navigable `url` from menu trees (`items` / nested `menu`). */
export function collectUrlsFromMenuTree(
  node: unknown,
  out: Set<string>,
  labels: Map<string, string> = new Map(),
): void {
  if (Array.isArray(node)) {
    for (const entry of node) collectUrlsFromMenuTree(entry, out, labels);
    return;
  }
  if (!isRecord(node)) return;

  const path = readMenuNodePath(node);
  if (path !== null) {
    rememberPath(path, readString(node.name), out, labels);
  }

  if (Array.isArray(node.items)) {
    collectUrlsFromMenuTree(node.items, out, labels);
  }
  if (Array.isArray(node.menu)) {
    collectUrlsFromMenuTree(node.menu, out, labels);
  }
}

function collectUrlsFromFooterBlock(
  block: Record<string, unknown>,
  out: Set<string>,
  labels: Map<string, string>,
): void {
  if (Array.isArray(block.menu)) {
    collectUrlsFromMenuTree(block.menu, out, labels);
  }
  if (!Array.isArray(block.blocks)) return;
  for (const nested of block.blocks) {
    if (!isRecord(nested)) continue;
    if (Array.isArray(nested.menu)) {
      collectUrlsFromMenuTree(nested.menu, out, labels);
    }
    if (Array.isArray(nested.list)) {
      for (const row of nested.list) {
        if (!isRecord(row)) continue;
        const path = readMenuNodePath(row);
        if (path !== null) {
          rememberPath(path, readString(row.name), out, labels);
        }
      }
    }
  }
}

/**
 * Paths + labels from lobby chrome menus on `initV2` / `getPage` `page`:
 * - `page.blocks[]` where `type` ∈ menuHeaderTop | menuHeader | footer
 * - `page.menu` (aside / gamesMenu / footer roots, etc.)
 */
export function collectKnownMenuPathCatalog(page: unknown): KnownMenuPathCatalog {
  const out = new Set<string>(['/']);
  const labels = new Map<string, string>([['/', 'Home']]);
  if (!isRecord(page)) return { paths: out, labels };

  // Current page URL is always navigable (deep-link / getPage target), not only menus.
  const selfPath = readMenuNodePath(page);
  if (selfPath !== null) {
    rememberPath(selfPath, readString(page.name) ?? readString(page.title), out, labels);
  }

  if (Array.isArray(page.blocks)) {
    for (const block of page.blocks) {
      if (!isRecord(block)) continue;
      const type = readString(block.type);
      if (type === undefined || !KNOWN_ROUTE_BLOCK_TYPE_SET.has(type)) continue;

      if (type === 'footer') {
        collectUrlsFromFooterBlock(block, out, labels);
        continue;
      }

      if (Array.isArray(block.menu)) {
        collectUrlsFromMenuTree(block.menu, out, labels);
      }
    }
  }

  if (Array.isArray(page.menu)) {
    collectUrlsFromMenuTree(page.menu, out, labels);
  }

  return { paths: out, labels };
}

export function collectKnownMenuPaths(page: unknown): ReadonlySet<string> {
  return collectKnownMenuPathCatalog(page).paths;
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
