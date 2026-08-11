import type { ItemButtonProps } from '../../../types';

import { memo, useMemo } from 'react';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppButton } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../context';
import {
  resolveHeaderMenuButtonSize,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
} from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

import styles from '../../../styles/items/ItemButton.module.scss';

function ItemButtonComponent({ item, rightSection }: ItemButtonProps) {
  const menuSizes = useHeaderMenuSizes();
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = useMemo(
    () =>
      showItemImg ? <ItemImage item={item} alt={label} onImgFailed={onImgError} /> : undefined,
    [showItemImg, item, label, onImgError],
  );

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
      active={item.active}
      matchRoute={item.matchRoute}
      activeMatch={item.activeMatch}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
      {...iconControlAttrs}
    />
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
