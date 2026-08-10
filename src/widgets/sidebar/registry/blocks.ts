import type { BlockProps } from '../types';
import type { HeaderMenuItem } from '@/widgets/header';
import type { ComponentType } from 'react';

import { DefaultItemBlock } from '../ui/blocks/DefaultItemBlock/DefaultItemBlock';
import { DropdownBlock } from '../ui/blocks/DropdownBlock/DropdownBlock';
import { Logo } from '../ui/blocks/Logo/Logo';
import { PromoBlock } from '../ui/blocks/PromoBlock/PromoBlock';
import { Search } from '../ui/blocks/Search/Search';
import { resolveBlockRegistryKey, type SidebarBlockRegistryKey } from './keys';

/**
 * Sync block map — defined in one module so Vite HMR cannot wipe entries
 * while leaving a stale empty `{ default }` registry (side-effect `registerBlocks` race).
 */
export const BLOCK_REGISTRY: Partial<Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>> = {
  default: DefaultItemBlock,
  menuDropdown: DropdownBlock,
  search_leftmenu: Search,
  timer: PromoBlock,
  wheel_mdl: PromoBlock,
  aside_header_logo: Logo,
};

/** Runtime overlay (tests / type-packs). Prefer static `BLOCK_REGISTRY` entries for app blocks. */
export function registerBlocks(
  entries: Partial<Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>>,
): void {
  Object.assign(BLOCK_REGISTRY, entries);
}

export type TypePackBlockOverlay = Partial<
  Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>
>;

function requireGlobalBlock(key: SidebarBlockRegistryKey): ComponentType<BlockProps> {
  const block = BLOCK_REGISTRY[key];
  if (block !== undefined) return block;

  const fallback = BLOCK_REGISTRY.default;
  if (fallback === undefined) {
    throw new Error(`Sidebar block registry is missing "${key}" and "default"`);
  }
  return fallback;
}

/** Resolve block: type-pack overlay first, then global `BLOCK_REGISTRY`. */
export function resolveBlockComponent(
  item: HeaderMenuItem,
  overlay?: TypePackBlockOverlay,
): ComponentType<BlockProps> {
  const key: SidebarBlockRegistryKey =
    item.items !== undefined && item.items.length > 0
      ? 'menuDropdown'
      : resolveBlockRegistryKey(item.key ?? '');

  return overlay?.[key] ?? requireGlobalBlock(key);
}
