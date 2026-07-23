import type { PromoBlockProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { useMenuItemRenderable } from '../../../hooks/useMenuItemRenderable';
import { hasItemImg, hasItemName, isRenderableItem } from '../../../lib/itemUtils';
import { MenuItemMedia } from '../../menu/MenuItemMedia/MenuItemMedia';
import { SidebarExceptionButton } from '../../menu/SidebarExceptionButton/SidebarExceptionButton';

function PromoBlockComponent({ item, className }: PromoBlockProps) {
  const { visible, onImgError, label } = useMenuItemRenderable(item);

  if (isRenderableItem(item) === false || visible === false) return null;

  const leftSection =
    hasItemImg(item) === true ? (
      <MenuItemMedia item={item} alt={label} onImgError={onImgError} />
    ) : undefined;

  return (
    <SidebarExceptionButton
      item={item}
      label={hasItemName(item) === true ? item.name : undefined}
      leftSection={leftSection}
      className={clsx(className)}
    />
  );
}

export const PromoBlock = memo(PromoBlockComponent);
PromoBlock.displayName = 'PromoBlock';
