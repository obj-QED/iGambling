import type { ItemActionIconProps } from '../../../types';

import { memo, useMemo } from 'react';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppActionIcon } from '@/shared/ui';

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
  const { onImgError, hideImageControl, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const content = useMemo(
    () =>
      hasItemImg(item) ? (
        <ItemImage
          className="cmf-ActionIcon-icon-svg"
          item={item}
          alt={label}
          onImgFailed={onImgError}
        />
      ) : (
        label.slice(0, 1).toUpperCase()
      ),
    [item, label, onImgError],
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
        active={item.active}
        matchRoute={item.matchRoute}
        activeMatch={item.activeMatch}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
        {...iconControlAttrs}
      >
        {content}
      </AppActionIcon>
    </HeaderActionIconTooltip>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
