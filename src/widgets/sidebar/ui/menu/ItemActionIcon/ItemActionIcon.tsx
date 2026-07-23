import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements/AppActionIcon';
import { useMenuActive } from '@/shared/hooks/useMenuActive';
import { useMediaState } from '@/shared/hooks/useMediaState';

import { useAsideMenuButtonSize } from '../../../hooks/useAsideMenuButtonSize';
import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { resolveMenuItemActionIconVariant } from '../../../lib/menuItemVariant';
import { MenuItemMedia } from '../MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/menu/ItemActionIcon.module.scss';

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const { menuActiveAttrs } = useMenuActive(item);
  const { onImgError, hideImageControl, iconControlAttrs, showItemImg } =
    useMediaState(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  return (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      hidden={hideImageControl}
      className={styles.root}
      variant={resolveMenuItemActionIconVariant(item)}
      size={size}
      aria-label={label}
      {...menuItemDataAttrs(item)}
      {...menuActiveAttrs}
      {...iconControlAttrs}
    >
      {showItemImg ? <MenuItemMedia item={item} alt={label} onImgError={onImgError} /> : null}
    </AppActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'SidebarItemActionIcon';
