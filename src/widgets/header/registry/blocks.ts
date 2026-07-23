import type { BlockProps, HeaderMenuItem } from '../types';
import type { ComponentType } from 'react';

import { DefaultItemBlock } from '../ui/blocks/DefaultItemBlock/DefaultItemBlock';
import { type BlockRegistryKey, resolveBlockRegistryKey } from './keys';

export const BLOCK_REGISTRY: Partial<Record<BlockRegistryKey, ComponentType<BlockProps>>> = {
  default: DefaultItemBlock,
};

export function registerBlocks(
  entries: Partial<Record<BlockRegistryKey, ComponentType<BlockProps>>>,
): void {
  Object.assign(BLOCK_REGISTRY, entries);
}

function requireBlock(key: BlockRegistryKey): ComponentType<BlockProps> {
  const block = BLOCK_REGISTRY[key];
  if (block !== undefined) return block;

  const fallback = BLOCK_REGISTRY.default;
  if (fallback === undefined) {
    throw new Error(`Block registry is missing "${key}" and "default"`);
  }
  return fallback;
}

export function resolveBlockComponent(item: HeaderMenuItem): ComponentType<BlockProps> {
  if (item.items !== undefined && item.items.length > 0) {
    return requireBlock('menuDropdown');
  }

  return requireBlock(resolveBlockRegistryKey(item.key ?? ''));
}
