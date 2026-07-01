import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements/AppActionIcon';
import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';

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

import styles from '../../../styles/menu/ItemActionIcon.module.scss';

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const menuSizes = useHeaderMenuSizes();
  const { onImgError, hideImageControl, iconControlAttrs } = useMenuItemMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const content =
    hasItemImg(item) === true ? (
      <MenuItemImage item={item} alt={label} inActionIcon onImgFailed={onImgError} />
    ) : (
      label.slice(0, 1).toUpperCase()
    );

  return (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      hidden={hideImageControl}
      className={styles.root}
      variant={resolveMenuItemActionIconVariant(item)}
      size={resolveHeaderMenuActionIconSize(menuSizes)}
      aria-label={label}
      {...menuItemDataAttrs(item)}
      {...iconControlAttrs}
    >
      {content}
    </AppActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
