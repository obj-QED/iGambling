import type { BlockProps } from '../../../types';

import { memo, useRef, useState } from 'react';

import { AppButton } from '@/elements/AppButton';
import { useCmfIconStyle } from '@/shared/hooks/useCmfIconStyle';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib/cmfIcon';

import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { HeaderPhotoFallback } from '../../menu/icons/HeaderPhotoFallback';
import { ItemIcon } from '../../menu/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/BonusBoxBlock.module.scss';

function BonusBoxBlockComponent({ item }: BlockProps) {
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  if (hasItemName(item) === false && hasItemImg(item) === false) return null;
  if (isRenderableItem(item) === false) return null;
  if (hasItemImg(item) === false) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const leftSection =
    imgFailed === true ? (
      <HeaderPhotoFallback />
    ) : (
      <ItemIcon
        ref={iconRef}
        className={styles.image}
        src={item.img ?? ''}
        alt={label}
        shape={resolveCmfIconShape(item, cmfStyle)}
        radius={resolveCmfIconRadius(item, cmfStyle)}
        onError={() => {
          setImgFailed(true);
        }}
      />
    );

  return (
    <AppButton
      href={href}
      variant="transparent"
      className={styles.root}
      aria-label={label}
      leftSection={leftSection}
      data-header-block={item.key}
      {...menuItemDataAttrs(item)}
    />
  );
}

export const BonusBoxBlock = memo(BonusBoxBlockComponent);
BonusBoxBlock.displayName = 'BonusBoxBlock';
