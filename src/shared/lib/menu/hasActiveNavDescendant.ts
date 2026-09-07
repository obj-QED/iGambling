import type { NavActiveSource } from './resolveNavActive';

import { resolveNavActive } from './resolveNavActive';

/** Menu node that may nest children for active-descendant checks. */
export type NavActiveTreeNode = NavActiveSource & {
  items?: NavActiveTreeNode[];
};

/**
 * True when any descendant (depth-first) is nav-active for `pathname`.
 * Does not treat the root parent itself as a match — callers pass `item.items`.
 */
export function hasActiveNavDescendant(
  items: readonly NavActiveTreeNode[] | undefined,
  pathname: string,
): boolean {
  if (items === undefined || items.length === 0) return false;

  for (const item of items) {
    if (resolveNavActive(item, pathname)) return true;
    if (hasActiveNavDescendant(item.items, pathname)) return true;
  }

  return false;
}
