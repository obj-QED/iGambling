import type { BlockProps } from '../types';

import { memo } from 'react';

import { resolveBlockComponent } from '../registry/blocks';

function BlockComponent({ item, className }: BlockProps) {
  const BlockComponentResolved = resolveBlockComponent(item);
  return <BlockComponentResolved item={item} className={className} />;
}

export const Block = memo(BlockComponent);
Block.displayName = 'SidebarBlock';
