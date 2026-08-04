import type { BlockProps } from '../types';

import { createElement, memo } from 'react';

import { useSidebarConfig } from '../context';
import { resolveBlockComponent } from '../registry/blocks';

function BlockComponent({ item, className }: BlockProps) {
  const { type } = useSidebarConfig();
  return createElement(resolveBlockComponent(item, type), { item, className });
}

export const Block = memo(BlockComponent);
Block.displayName = 'SidebarBlock';
