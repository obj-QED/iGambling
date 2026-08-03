import type { SpecialIconBlockProps } from '../../../types';

import { memo, useRef } from 'react';

import { AppActionIcon } from '@/elements';
import { useCmfIconStyle, useMediaState, useNavActive } from '@/shared/hooks';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib';

import { useHeaderMenuSizes } from '../../../context';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  menuItemDataAttrs,
  resolveHeaderMenuActionIconSize,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../lib';
import { ItemIcon } from '../../items/ItemIcon/ItemIcon';
import { HeaderActionIconTooltip } from '../../shared/HeaderActionIconTooltip';

function SpecialIconBlockComponent({
  item,
  fallbackIcon,
  className,
  disabled,
}: SpecialIconBlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
  const { activeAttrs } = useNavActive(item);
  const { onImgError, showItemImg, hideImageControl, iconControlAttrs } = useMediaState(item);

  if (!hasItemName(item) && !hasItemImg(item)) return null;
  if (!isRenderableItem(item)) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const icon = showItemImg ? (
    <ItemIcon
      className="cmf-ActionIcon-icon-svg"
      ref={iconRef}
      src={item.img ?? ''}
      alt={label}
      shape={resolveCmfIconShape(item, cmfStyle)}
      radius={resolveCmfIconRadius(item, cmfStyle)}
      onError={onImgError}
    />
  ) : (
    fallbackIcon
  );

  return (
    <HeaderActionIconTooltip item={item}>
      <AppActionIcon
        name={item.name}
        img={item.img}
        href={href}
        hidden={hideImageControl}
        className={className}
        variant={resolveMenuItemActionIconVariant(item)}
        size={actionIconSize}
        aria-label={label}
        disabled={disabled}
        {...menuItemDataAttrs(item)}
        {...activeAttrs}
        {...iconControlAttrs}
      >
        {icon}
      </AppActionIcon>
    </HeaderActionIconTooltip>
  );
}

export const SpecialIconBlock = memo(SpecialIconBlockComponent);
SpecialIconBlock.displayName = 'SpecialIconBlock';
