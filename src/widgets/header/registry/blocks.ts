import type { BlockProps, HeaderMenuItem } from '../types';
import type { ComponentType } from 'react';

import { BonusBoxBlock } from '../ui/blocks/BonusBoxBlock/BonusBoxBlock';
import { ColorSchemeBlock } from '../ui/blocks/ColorSchemeBlock/ColorSchemeBlock';
import { DefaultItemBlock } from '../ui/blocks/DefaultItemBlock/DefaultItemBlock';
import { DropdownBlock } from '../ui/blocks/DropdownBlock/DropdownBlock';
import { LogoBlock } from '../ui/blocks/LogoBlock/LogoBlock';
import { NotificationBlock } from '../ui/blocks/NotificationBlock/NotificationBlock';
import { SearchBlock } from '../ui/blocks/SearchBlock/SearchBlock';
import { WalletBlock } from '../ui/blocks/WalletBlock/WalletBlock';
import { type BlockRegistryKey, resolveBlockRegistryKey } from './keys';

/**
 * Sync block map — defined in one module so Vite HMR cannot wipe entries
 * while leaving a stale empty `{ default }` registry (side-effect `registerBlocks` race).
 */
export const BLOCK_REGISTRY: Partial<Record<BlockRegistryKey, ComponentType<BlockProps>>> = {
  default: DefaultItemBlock,
  menuDropdown: DropdownBlock,
  search: SearchBlock,
  logo: LogoBlock,
  bonus_box: BonusBoxBlock,
  wallet: WalletBlock,
  notification: NotificationBlock,
  color_scheme: ColorSchemeBlock,
};

/** Runtime overlay (tests / type-packs). Prefer static `BLOCK_REGISTRY` entries for app blocks. */
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
