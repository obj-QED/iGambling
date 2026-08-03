import type { BlockProps } from '../types';
import type { HeaderMenuItem } from '@/widgets/header';
import type { ComponentType } from 'react';

import { DefaultItemBlock } from '../ui/blocks/DefaultItemBlock/DefaultItemBlock';
import { resolveBlockRegistryKey, type SidebarBlockRegistryKey } from './keys';

export const BLOCK_REGISTRY: Partial<Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>> = {
  default: DefaultItemBlock,
};

export function registerBlocks(
  entries: Partial<Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>>,
): void {
  Object.assign(BLOCK_REGISTRY, entries);
}

type TypePackBlockOverlay = Partial<Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>>;

type TypePackBlocksResolver = (type: string) => TypePackBlockOverlay | undefined;

let resolveTypePackBlocks: TypePackBlocksResolver | null = null;

/** Called from `typePacks/registry` after packs are initialized (breaks import cycle). */
export function bindSidebarTypePackBlocksResolver(resolver: TypePackBlocksResolver): void {
  resolveTypePackBlocks = resolver;
}

function requireGlobalBlock(key: SidebarBlockRegistryKey): ComponentType<BlockProps> {
  const block = BLOCK_REGISTRY[key];
  if (block !== undefined) return block;

  const fallback = BLOCK_REGISTRY.default;
  if (fallback === undefined) {
    throw new Error(`Sidebar block registry is missing "${key}" and "default"`);
  }
  return fallback;
}

export function resolveBlockComponent(
  item: HeaderMenuItem,
  type: string,
): ComponentType<BlockProps> {
  const key: SidebarBlockRegistryKey =
    item.items !== undefined && item.items.length > 0
      ? 'menuDropdown'
      : resolveBlockRegistryKey(item.key ?? '');

  const overlay = resolveTypePackBlocks?.(type);
  return overlay?.[key] ?? requireGlobalBlock(key);
}
