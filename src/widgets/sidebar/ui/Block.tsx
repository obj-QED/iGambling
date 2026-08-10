import type { BlockProps } from '../types';

import { createElement, memo } from 'react';

import { resolveBlockComponent } from '../registry/blocks';
import { useSidebarTypePack } from './type';

function BlockComponent({ item, className }: BlockProps) {
  const { blocks } = useSidebarTypePack();
  return createElement(resolveBlockComponent(item, blocks), { item, className });
}

export const Block = memo(BlockComponent);
Block.displayName = 'SidebarBlock';
