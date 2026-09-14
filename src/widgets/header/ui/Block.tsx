import type { BlockProps } from '../types';
import type { ComponentType } from 'react';

import { memo } from 'react';

import { isNonEmptyArray } from '@/shared/lib';

import { isSpecialBlockKey } from '../lib';
import { resolveBlockRegistryKey } from '../registry/keys';
import { BonusBoxBlock } from './blocks/BonusBoxBlock/BonusBoxBlock';
import { ColorSchemeBlock } from './blocks/ColorSchemeBlock/ColorSchemeBlock';
import { DefaultItemBlock } from './blocks/DefaultItemBlock/DefaultItemBlock';
import { DropdownBlock } from './blocks/DropdownBlock/DropdownBlock';
import { LogoBlock } from './blocks/LogoBlock/LogoBlock';
import { MenuToggleBlock } from './blocks/MenuToggleBlock/MenuToggleBlock';
import { NotificationBlock } from './blocks/NotificationBlock/NotificationBlock';
import { SearchBlock } from './blocks/SearchBlock/SearchBlock';
import { WalletBlock } from './blocks/WalletBlock/WalletBlock';
import { useHeaderTypePack } from './type';

/**
 * Sync block router — explicit JSX (no createElement).
 *
 * Precedence:
 * 1. dropdown items → typePack.blocks.menuDropdown | DropdownBlock
 * 2. key not in HEADER_SPECIAL_BLOCK_KEYS → DefaultItemBlock
 * 3. typePack.blocks[key] overlay
 * 4. switch on known keys → Search | Logo | Wallet | …
 */
function BlockComponent({ item }: BlockProps) {
  const { blocks } = useHeaderTypePack();

  if (isNonEmptyArray(item.items)) {
    const Overlay = blocks?.menuDropdown;
    if (Overlay) {
      return <Overlay item={item} />;
    }
    return <DropdownBlock item={item} />;
  }

  if (!isSpecialBlockKey(item.key)) {
    return <DefaultItemBlock item={item} />;
  }

  const registryKey = resolveBlockRegistryKey(item.key ?? '');
  const Overlay = blocks?.[registryKey] as ComponentType<BlockProps> | undefined;
  if (Overlay) {
    return <Overlay item={item} />;
  }

  switch (registryKey) {
    case 'search':
      return <SearchBlock item={item} />;
    case 'logo':
      return <LogoBlock item={item} />;
    case 'bonus_box':
      return <BonusBoxBlock item={item} />;
    case 'wallet':
      return <WalletBlock item={item} />;
    case 'notification':
      return <NotificationBlock item={item} />;
    case 'color_scheme':
      return <ColorSchemeBlock item={item} />;
    case 'menu_toggle':
      return <MenuToggleBlock item={item} />;
    case 'menuDropdown':
      return <DropdownBlock item={item} />;
    case 'default':
    default:
      return <DefaultItemBlock item={item} />;
  }
}

export const Block = memo(BlockComponent);
Block.displayName = 'HeaderBlock';
