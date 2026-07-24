import type { ItemButtonProps } from '../../../types';

import { memo } from 'react';

import { AppButton } from '@/elements/AppButton';
import { useMediaState } from '@/shared/hooks/useMediaState';
import { useMenuActive } from '@/shared/hooks/useMenuActive';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuButtonSize } from '../../../lib/headerMenuSize';
import { menuItemDataAttrs, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

import styles from '../../../styles/menu/ItemButton.module.scss';

function ItemButtonComponent({ item, rightSection }: ItemButtonProps) {
  const menuSizes = useHeaderMenuSizes();
  const { menuActiveAttrs } = useMenuActive(item);
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <MenuItemImage item={item} alt={label} onImgFailed={onImgError} />
  ) : undefined;

  return (
    <AppButton
      label={item.name}
      href={href}
      className={styles.root}
      variant={resolveMenuItemButtonVariant(item)}
      size={resolveHeaderMenuButtonSize(item, menuSizes)}
      justify="flex-start"
      leftSection={leftSection}
      rightSection={rightSection}
      {...menuItemDataAttrs(item)}
      {...menuActiveAttrs}
      {...iconControlAttrs}
    />
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
