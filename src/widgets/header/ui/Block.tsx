import type { BlockProps } from '../types';

import { memo } from 'react';

import { resolveBlockComponent } from '../registry/blocks';

function BlockComponent({ item }: BlockProps) {
  const BlockComponentResolved = resolveBlockComponent(item);
  return <BlockComponentResolved item={item} />;
}

export const Block = memo(BlockComponent);
Block.displayName = 'Block';
