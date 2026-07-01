import type { SpecialIconBlockProps } from '../../../types';

import { memo, useRef } from 'react';

import clsx from 'clsx';

import { AppActionIcon } from '@/elements/AppActionIcon';
import { useCmfIconStyle } from '@/shared/hooks/useCmfIconStyle';
import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib/cmfIcon';

import { useConfig } from '../../../context/useConfig';
import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuActionIconSize } from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { ItemIcon } from '../../menu/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/SpecialIconBlock.module.scss';

function SpecialIconBlockComponent({ item, fallbackIcon, className }: SpecialIconBlockProps) {
  const config = useConfig();
  const menuSizes = useHeaderMenuSizes();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
  const { onImgError, showItemImg, hideImageControl, iconControlAttrs } =
    useMenuItemMediaState(item);

  if (hasItemName(item) === false && hasItemImg(item) === false) return null;
  if (isRenderableItem(item) === false) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const icon =
    showItemImg === true ? (
      <ItemIcon
        ref={iconRef}
        inActionIcon
        src={item.img ?? ''}
        alt={label}
        shape={resolveCmfIconShape(item, config, cmfStyle)}
        radius={resolveCmfIconRadius(item, config, cmfStyle)}
        onError={onImgError}
      />
    ) : (
      fallbackIcon
    );

  return (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      hidden={hideImageControl}
      className={clsx(styles.root, className)}
      variant="default"
      size={actionIconSize}
      aria-label={label}
      {...menuItemDataAttrs(item)}
      {...iconControlAttrs}
    >
      {icon}
    </AppActionIcon>
  );
}

export const SpecialIconBlock = memo(SpecialIconBlockComponent);
SpecialIconBlock.displayName = 'SpecialIconBlock';
