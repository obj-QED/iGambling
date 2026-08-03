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

type TypePackBlockOverlay = Partial<Record<BlockRegistryKey, ComponentType<BlockProps>>>;

type TypePackBlocksResolver = (type: string) => TypePackBlockOverlay | undefined;

let resolveTypePackBlocks: TypePackBlocksResolver | null = null;

/** Called from `typePacks/registry` after packs are initialized (breaks import cycle). */
export function bindHeaderTypePackBlocksResolver(resolver: TypePackBlocksResolver): void {
  resolveTypePackBlocks = resolver;
}

function requireGlobalBlock(key: BlockRegistryKey): ComponentType<BlockProps> {
  const block = BLOCK_REGISTRY[key];
  if (block !== undefined) return block;

  const fallback = BLOCK_REGISTRY.default;
  if (fallback === undefined) {
    throw new Error(`Block registry is missing "${key}" and "default"`);
  }
  return fallback;
}

export function resolveBlockComponent(
  item: HeaderMenuItem,
  type: string,
): ComponentType<BlockProps> {
  const key: BlockRegistryKey =
    item.items !== undefined && item.items.length > 0
      ? 'menuDropdown'
      : resolveBlockRegistryKey(item.key ?? '');

  const overlay = resolveTypePackBlocks?.(type);
  return overlay?.[key] ?? requireGlobalBlock(key);
}
