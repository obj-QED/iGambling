import type { BlockProps } from '../../../types';

import { memo, useRef, useState } from 'react';

import { AppButton } from '@/elements';
import { useCmfIconStyle } from '@/shared/hooks';
import {
  controlAttrs,
  resolveCmfIconRadius,
  resolveCmfIconShape,
  resolveCmfScope,
} from '@/shared/lib';

import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib';
import { HeaderPhotoFallback } from '../../items/icons/HeaderPhotoFallback';
import { ItemIcon } from '../../items/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/BonusBoxBlock.module.scss';

function BonusBoxBlockComponent({ item }: BlockProps) {
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  if (!hasItemName(item) && !hasItemImg(item)) return null;
  if (!isRenderableItem(item)) return null;
  if (!hasItemImg(item)) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const leftSection = imgFailed ? (
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
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
    />
  );
}

export const BonusBoxBlock = memo(BonusBoxBlockComponent);
BonusBoxBlock.displayName = 'BonusBoxBlock';
