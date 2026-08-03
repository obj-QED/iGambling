import type { BlockProps } from '../types';

import { memo } from 'react';

import { useConfig } from '../context';
import { resolveBlockComponent } from '../registry/blocks';

function BlockComponent({ item }: BlockProps) {
  const { type } = useConfig();
  const Resolved = resolveBlockComponent(item, type);
  return <Resolved item={item} />;
}

export const Block = memo(BlockComponent);
Block.displayName = 'Block';
