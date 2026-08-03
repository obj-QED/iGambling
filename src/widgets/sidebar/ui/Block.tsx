import type { BlockProps } from '../types';

import { memo } from 'react';

import { useSidebarConfig } from '../context';
import { resolveBlockComponent } from '../registry/blocks';

function BlockComponent({ item, className }: BlockProps) {
  const { type } = useSidebarConfig();
  const Resolved = resolveBlockComponent(item, type);
  return <Resolved item={item} className={className} />;
}

export const Block = memo(BlockComponent);
Block.displayName = 'SidebarBlock';
