import type { HeaderMenuItem } from '@/widgets/header';

import { itemKey, itemName } from './key';

/** Visible control title — `name` only. `label` is tooltip/HTML copy (see AppTooltip). */
export function resolveItemLabel(item: HeaderMenuItem): string {
  const name = itemName(item);
  if (name.length > 0) return name;
  return itemKey(item);
}

export { resolveItemHref } from '@/shared/lib';
