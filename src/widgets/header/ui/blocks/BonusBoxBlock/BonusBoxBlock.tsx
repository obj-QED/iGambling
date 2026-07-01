import type { BlockProps } from '../../../types';

import { memo, useRef, useState } from 'react';

import { AppLink } from '@/shared/ui';

import { useConfig } from '../../../context/useConfig';
import { useCmfMenuIconStyle } from '../../../hooks/useCmfMenuIconStyle';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemIconRadius, resolveMenuItemIconShape } from '../../../lib/menuItemIcon';
import { HeaderPhotoFallback } from '../../menu/icons/HeaderPhotoFallback';
import { ItemIcon } from '../../menu/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/BonusBoxBlock.module.scss';

function BonusBoxBlockComponent({ item }: BlockProps) {
  const config = useConfig();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfMenuIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  if (hasItemName(item) === false && hasItemImg(item) === false) return null;
  if (isRenderableItem(item) === false) return null;
  if (hasItemImg(item) === false) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const content =
    imgFailed === true ? (
      <HeaderPhotoFallback />
    ) : (
      <ItemIcon
        ref={iconRef}
        className={styles.image}
        src={item.img ?? ''}
        alt={label}
        shape={resolveMenuItemIconShape(item, config, cmfStyle)}
        radius={resolveMenuItemIconRadius(item, config, cmfStyle)}
        onError={() => {
          setImgFailed(true);
        }}
      />
    );

  if (href.length > 0) {
    return (
      <AppLink
        href={href}
        className={styles.root}
        aria-label={label}
        data-header-block={item.key}
        data-menu-key={item.key}
      >
        {content}
      </AppLink>
    );
  }

  return (
    <span className={styles.root} data-header-block={item.key} data-menu-key={item.key}>
      {content}
    </span>
  );
}

export const BonusBoxBlock = memo(BonusBoxBlockComponent);
BonusBoxBlock.displayName = 'BonusBoxBlock';
