import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements/AppActionIcon';
import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';

import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { ASIDE_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { MenuItemMedia } from '../MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/menu/ItemActionIcon.module.scss';

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const { onImgError, hideImageControl, iconControlAttrs, showItemImg } =
    useMenuItemMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  return (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      hidden={hideImageControl}
      className={styles.root}
      variant={resolveMenuItemButtonVariant(item)}
      size={ASIDE_MENU_BUTTON_SIZE}
      aria-label={label}
      {...menuItemDataAttrs(item)}
      {...iconControlAttrs}
    >
      {showItemImg ? <MenuItemMedia item={item} alt={label} onImgError={onImgError} /> : null}
    </AppActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'SidebarItemActionIcon';
