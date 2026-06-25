import type { BlockProps } from '../../../types';

import { memo, useState } from 'react';

import { AppLink } from '@/shared/ui';

import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { HeaderPhotoFallback } from '../../menu/icons/HeaderPhotoFallback';
import { ItemIcon } from '../../menu/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/BonusBoxBlock.module.scss';

function BonusBoxBlockComponent({ item }: BlockProps) {
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
        className={styles.image}
        src={item.img ?? ''}
        alt={label}
        onError={() => {
          setImgFailed(true);
        }}
      />
    );

  if (href.length > 0) {
    return (
      <AppLink href={href} className={styles.root} aria-label={label} data-header-block={item.key}>
        {content}
      </AppLink>
    );
  }

  return (
    <span className={styles.root} data-header-block={item.key}>
      {content}
    </span>
  );
}

export const BonusBoxBlock = memo(BonusBoxBlockComponent);
BonusBoxBlock.displayName = 'BonusBoxBlock';
