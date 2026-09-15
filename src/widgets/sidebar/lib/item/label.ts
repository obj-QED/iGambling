import type { MenuItem as HeaderMenuItem } from '@/entities/menu';

import { itemKey, itemName } from './key';

/** Visible control title — `name` only. `label` is tooltip/HTML copy (see AppTooltip). */
export function resolveItemLabel(item: HeaderMenuItem): string {
  const name = itemName(item);
  if (name.length > 0) return name;
  return itemKey(item);
}

/** First glyph of `name` for icon-less slideout collapsed rail. */
export function resolveItemNameInitial(item: HeaderMenuItem): string | null {
  const name = itemName(item).trim();
  if (name.length === 0) return null;
  return name.slice(0, 1).toUpperCase();
}

export { resolveItemHref } from '@/shared/lib';
