import type { BlockProps } from '../types';

import { createElement, memo } from 'react';

import { useConfig } from '../context';
import { resolveBlockComponent } from '../registry/blocks';

function BlockComponent({ item }: BlockProps) {
  const { type } = useConfig();
  return createElement(resolveBlockComponent(item, type), { item });
}

export const Block = memo(BlockComponent);
Block.displayName = 'Block';
