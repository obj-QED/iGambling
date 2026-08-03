import type { ItemButtonProps } from '../../../types';

import { memo } from 'react';

import { AppButton } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';
import { useHeaderMenuSizes } from '../../../context';
import { resolveHeaderMenuButtonSize, menuItemDataAttrs, resolveItemHref, resolveItemLabel, resolveMenuItemButtonVariant } from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

import styles from '../../../styles/items/ItemButton.module.scss';

function ItemButtonComponent({ item, rightSection }: ItemButtonProps) {
  const menuSizes = useHeaderMenuSizes();
  const { activeAttrs } = useNavActive(item);
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <ItemImage item={item} alt={label} onImgFailed={onImgError} />
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
      {...activeAttrs}
      {...iconControlAttrs}
    />
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
