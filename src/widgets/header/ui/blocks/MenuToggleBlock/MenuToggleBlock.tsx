import type { BlockProps } from '../../../types';

import { memo, useCallback } from 'react';

import { controlAttrs, resolveCmfScope, useSidebarDrawer } from '@/shared/lib';
import { MenuToggle } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../context';
import { resolveHeaderMenuActionIconSize, resolveMenuItemActionIconVariant } from '../../../lib';
import { HeaderActionIconTooltip } from '../../shared/HeaderActionIconTooltip';

function MenuToggleBlockComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const { opened, toggle } = useSidebarDrawer();

  const handleClick = useCallback(() => {
    toggle();
  }, [toggle]);

  const label = item.label?.trim() || item.name?.trim() || 'Menu';

  return (
    <HeaderActionIconTooltip item={item}>
      <MenuToggle
        opened={opened}
        onClick={handleClick}
        variant={resolveMenuItemActionIconVariant(item)}
        size={resolveHeaderMenuActionIconSize(menuSizes)}
        aria-label={label}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
      />
    </HeaderActionIconTooltip>
  );
}

export const MenuToggleBlock = memo(MenuToggleBlockComponent);
MenuToggleBlock.displayName = 'MenuToggleBlock';
