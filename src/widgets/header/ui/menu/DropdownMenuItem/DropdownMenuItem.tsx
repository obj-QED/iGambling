import type { DropdownMenuItemProps } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { AppButton } from '@/elements/AppButton';
import { useMenuActive } from '@/shared/hooks/useMenuActive';
import { useMediaState } from '@/shared/hooks/useMediaState';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuButtonSize } from '../../../lib/headerMenuSize';
import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

function DropdownMenuItemComponent({ item }: DropdownMenuItemProps) {
  const menuSizes = useHeaderMenuSizes();
  const { menuActiveAttrs } = useMenuActive(item);
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <MenuItemImage item={item} alt={label} onImgFailed={onImgError} />
  ) : undefined;
  const content = item?.name ?? label;

  return (
    <Menu.Item
      component={AppButton}
      href={href}
      label={content}
      leftSection={leftSection}
      variant={resolveMenuItemButtonVariant(item)}
      size={resolveHeaderMenuButtonSize(item, menuSizes)}
      fullWidth
      justify="flex-start"
      {...menuItemDataAttrs(item)}
      {...menuActiveAttrs}
      {...iconControlAttrs}
    />
  );
}

export const DropdownMenuItem = memo(DropdownMenuItemComponent);
DropdownMenuItem.displayName = 'DropdownMenuItem';
