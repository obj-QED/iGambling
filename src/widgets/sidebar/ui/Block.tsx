import type { BlockProps } from '../types';
import type { ComponentType } from 'react';

import { memo } from 'react';

import { useSidebarConfig } from '../context';
import { isSpecialBlockKey } from '../lib';
import { resolveBlockRegistryKey } from '../registry/keys';
import { DefaultItemBlock } from './blocks/DefaultItemBlock/DefaultItemBlock';
import { DropdownBlock } from './blocks/DropdownBlock/DropdownBlock';
import { Logo } from './blocks/Logo/Logo';
import { PromoBlock } from './blocks/PromoBlock/PromoBlock';
import { Search } from './blocks/Search/Search';
import { useSidebarTypePack } from './type';

/**
 * Sync block router — explicit JSX (no createElement).
 *
 * Precedence:
 * 1. dropdown items → typePack.blocks.menuDropdown | DropdownBlock
 * 2. key not in `schema.specialBlockKeys` → DefaultItemBlock
 * 3. typePack.blocks[key] overlay (e.g. compact SearchIconVariant)
 * 4. switch on known keys → Search | Promo | Logo | DefaultItemBlock
 */
function BlockComponent({ item, className }: BlockProps) {
  const { blocks } = useSidebarTypePack();
  const { specialBlockKeys } = useSidebarConfig();

  if (item.items !== undefined && item.items.length > 0) {
    const Overlay = blocks?.menuDropdown;
    if (Overlay) {
      return <Overlay item={item} className={className} />;
    }
    return <DropdownBlock item={item} className={className} />;
  }

  if (!isSpecialBlockKey(item.key, specialBlockKeys)) {
    return <DefaultItemBlock item={item} className={className} />;
  }

  const registryKey = resolveBlockRegistryKey(item.key ?? '');
  const Overlay = blocks?.[registryKey] as ComponentType<BlockProps> | undefined;
  if (Overlay) {
    return <Overlay item={item} className={className} />;
  }

  switch (registryKey) {
    case 'search_leftmenu':
      return <Search item={item} className={className} />;
    case 'timer':
    case 'wheel_mdl':
      return <PromoBlock item={item} className={className} />;
    case 'aside_header_logo':
      return <Logo item={item} className={className} />;
    case 'menuDropdown':
      return <DropdownBlock item={item} className={className} />;
    case 'default':
    default:
      return <DefaultItemBlock item={item} className={className} />;
  }
}

export const Block = memo(BlockComponent);
Block.displayName = 'SidebarBlock';
