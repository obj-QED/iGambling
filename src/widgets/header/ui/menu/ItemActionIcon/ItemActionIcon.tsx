import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements/AppActionIcon';
import { useMediaState } from '@/shared/hooks/useMediaState';
import { useMenuActive } from '@/shared/hooks/useMenuActive';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuActionIconSize } from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemActionIconVariant } from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const menuSizes = useHeaderMenuSizes();
  const { menuActiveAttrs } = useMenuActive(item);
  const { onImgError, hideImageControl, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const content =
    hasItemImg(item) === true ? (
      <MenuItemImage item={item} alt={label} onImgFailed={onImgError} />
    ) : (
      label.slice(0, 1).toUpperCase()
    );

  return (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      hidden={hideImageControl}
      variant={resolveMenuItemActionIconVariant(item)}
      size={resolveHeaderMenuActionIconSize(menuSizes)}
      aria-label={label}
      {...menuItemDataAttrs(item)}
      {...menuActiveAttrs}
      {...iconControlAttrs}
    >
      {content}
    </AppActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
