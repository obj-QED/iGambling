import type { PromoBlockProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { useMenuItemRenderable } from '../../../hooks';
import { hasItemImg, hasItemName, isRenderableItem } from '../../../lib';
import { useSidebarTypePack } from '../../../typePacks';
import { ItemMedia } from '../../items/ItemMedia/ItemMedia';
import { SidebarExceptionButton } from '../../items/SidebarExceptionButton/SidebarExceptionButton';

/** Default-type promo; compact overrides via typePack.blocks. */
function PromoBlockComponent({ item, className }: PromoBlockProps) {
  const { itemKind, Item } = useSidebarTypePack();
  const { visible, onImgError, label } = useMenuItemRenderable(item);

  if (!isRenderableItem(item) || !visible) return null;

  if (itemKind === 'actionIcon') {
    return <Item item={item} className={className} />;
  }

  const leftSection = hasItemImg(item) ? (
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

export const PromoBlock = memo(PromoBlockComponent);
PromoBlock.displayName = 'PromoBlock';
