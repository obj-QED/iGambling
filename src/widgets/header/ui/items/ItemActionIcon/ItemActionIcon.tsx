import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';

import { useHeaderMenuSizes } from '../../../context';
import {
  hasItemImg,
  menuItemDataAttrs,
  resolveHeaderMenuActionIconSize,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const menuSizes = useHeaderMenuSizes();
  const { activeAttrs } = useNavActive(item);
  const { onImgError, hideImageControl, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const content = hasItemImg(item) ? (
    <ItemImage
      className="cmf-ActionIcon-icon-svg"
      item={item}
      alt={label}
      onImgFailed={onImgError}
    />
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
      {...activeAttrs}
      {...iconControlAttrs}
    >
      {content}
    </AppActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
