import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { useMenuItemRenderable } from '../../../../hooks';
import { hasItemName, isRenderableItem } from '../../../../lib';
import { ItemMedia } from '../../../items/ItemMedia/ItemMedia';
import { SidebarExceptionButton } from '../../../items/SidebarExceptionButton/SidebarExceptionButton';

/** Default aside promo row (full-width exception button). */
function PromoRowVariantComponent({ item, className }: BlockProps) {
  const { visible, onImgError, label, showItemImg } = useMenuItemRenderable(item);

  if (!isRenderableItem(item) || !visible) return null;

  /* Only pass a section when media is actually shown — null ItemMedia still creates an empty slot. */
  const leftSection = showItemImg ? (
    <ItemMedia item={item} alt={label} onImgError={onImgError} />
  ) : undefined;

  return (
    <SidebarExceptionButton
      item={item}
      label={hasItemName(item) ? item.name : undefined}
      leftSection={leftSection}
      className={clsx(className)}
    />
  );
}

export const PromoRowVariant = memo(PromoRowVariantComponent);
PromoRowVariant.displayName = 'SidebarPromoRowVariant';
export default PromoRowVariant;
