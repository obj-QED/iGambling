import type { HeaderMenuItem } from '../../../types';
import type { ReactNode } from 'react';

import { memo, useRef, useState } from 'react';

import { ActionIcon } from '@mantine/core';
import clsx from 'clsx';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import { useConfig } from '../../../context/useConfig';
import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { useCmfMenuIconStyle } from '../../../hooks/useCmfMenuIconStyle';
import { resolveHeaderMenuActionIconSize } from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemIconRadius, resolveMenuItemIconShape } from '../../../lib/menuItemIcon';
import { HeaderPhotoFallback } from '../../menu/icons/HeaderPhotoFallback';
import { ItemIcon } from '../../menu/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/SpecialIconBlock.module.scss';

type SpecialIconBlockProps = {
  item: HeaderMenuItem;
  fallbackIcon: ReactNode;
  className?: string;
};

function SpecialIconBlockComponent({ item, fallbackIcon, className }: SpecialIconBlockProps) {
  const config = useConfig();
  const menuSizes = useHeaderMenuSizes();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfMenuIconStyle(iconRef);
  const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
  const [imgFailed, setImgFailed] = useState(false);

  if (hasItemName(item) === false && hasItemImg(item) === false) return null;
  if (isRenderableItem(item) === false) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const hrefDisabled = isValidAppHref(href) === false;
  const icon =
    hasItemImg(item) === true && imgFailed === false ? (
      <ItemIcon
        ref={iconRef}
        inActionIcon
        src={item.img ?? ''}
        alt={label}
        shape={resolveMenuItemIconShape(item, config, cmfStyle)}
        radius={resolveMenuItemIconRadius(item, config, cmfStyle)}
        onError={() => {
          setImgFailed(true);
        }}
      />
    ) : hasItemImg(item) === true && imgFailed === true ? (
      <HeaderPhotoFallback />
    ) : (
      fallbackIcon
    );

  const rootClassName = clsx(styles.root, className);

  if (hrefDisabled === false) {
    return (
      <ActionIcon
        className={rootClassName}
        component={AppLink}
        href={href}
        variant="default"
        size={actionIconSize}
        aria-label={label}
        {...menuItemDataAttrs(item)}
      >
        {icon}
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      className={rootClassName}
      variant="default"
      size={actionIconSize}
      aria-label={label}
      disabled
      {...menuItemDataAttrs(item)}
    >
      {icon}
    </ActionIcon>
  );
}

export const SpecialIconBlock = memo(SpecialIconBlockComponent);
SpecialIconBlock.displayName = 'SpecialIconBlock';
