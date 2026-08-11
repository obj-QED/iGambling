import type { SpecialIconBlockProps } from '../../../types';

import { memo, useMemo, useRef } from 'react';

import { useCmfIconStyle, useMediaState } from '@/shared/hooks';
import {
  controlAttrs,
  resolveCmfIconRadius,
  resolveCmfIconShape,
  resolveCmfScope,
} from '@/shared/lib';
import { AppActionIcon } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../context';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
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
  const { onImgError, showItemImg, hideImageControl, iconControlAttrs } = useMediaState(item);
  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const icon = useMemo(
    () =>
      showItemImg ? (
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
      ),
    [showItemImg, item, label, cmfStyle, onImgError, fallbackIcon],
  );

  if (!hasItemName(item) && !hasItemImg(item)) return null;
  if (!isRenderableItem(item)) return null;

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
        active={item.active}
        matchRoute={item.matchRoute}
        activeMatch={item.activeMatch}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
        {...iconControlAttrs}
      >
        {icon}
      </AppActionIcon>
    </HeaderActionIconTooltip>
  );
}

export const SpecialIconBlock = memo(SpecialIconBlockComponent);
SpecialIconBlock.displayName = 'SpecialIconBlock';
