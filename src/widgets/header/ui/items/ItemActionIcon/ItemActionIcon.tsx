import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import { AppActionIcon } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { useHeaderMenuSizes } from '../../../context';
import {
  hasItemImg,
  resolveHeaderMenuActionIconSize,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../lib';
import { HeaderActionIconTooltip } from '../../shared/HeaderActionIconTooltip';
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
    <HeaderActionIconTooltip item={item}>
      <AppActionIcon
        name={item.name}
        img={item.img}
        href={href}
        hidden={hideImageControl}
        variant={resolveMenuItemActionIconVariant(item)}
        size={resolveHeaderMenuActionIconSize(menuSizes)}
        aria-label={label}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
        {...activeAttrs}
        {...iconControlAttrs}
      >
        {content}
      </AppActionIcon>
    </HeaderActionIconTooltip>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
