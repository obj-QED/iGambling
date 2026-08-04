import type { BlockProps } from '../types';
import type { HeaderMenuItem } from '@/widgets/header';
import type { ComponentType, ReactNode } from 'react';

import { isSpecialBlockKey } from '../lib';
import { Block } from '../ui/Block';

/**
 * Map chrome (header/footer) items: special keys → Block registry; others → pack link.
 */
export function renderChromeItems(
  items: HeaderMenuItem[],
  PackItem: ComponentType<BlockProps>,
): ReactNode[] {
  return items.map((item) => {
    const Item = isSpecialBlockKey(item.key) ? Block : PackItem;
    return <Item key={item.key ?? item.name} item={item} />;
  });
}
