import type { BlockProps } from '../../../types';

import { memo, useState } from 'react';

import { AppButton } from '@/elements/AppButton';

import {
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';

import styles from '../../../styles/blocks/LogoBlock.module.scss';

function LogoBlockComponent({ item }: BlockProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (isRenderableItem(item) === false) return null;

  const href = resolveItemHref(item.url);
  const alt = resolveItemLabel(item);
  const hasImg = (item.img?.length ?? 0) > 0;

  if (hasImg === false) {
    return (
      <AppButton
        href={href}
        label={alt}
        variant="transparent"
        className={styles.textLogo}
        aria-label={alt}
        {...menuItemDataAttrs(item)}
      />
    );
  }

  if (imgFailed === true) return null;

  return (
    <AppButton
      href={href}
      variant="transparent"
      className={styles.root}
      aria-label={alt}
      leftSection={
        <img
          className={styles.image}
          src={item.img}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={() => {
            setImgFailed(true);
          }}
        />
      }
      {...menuItemDataAttrs(item)}
    />
  );
}

export const LogoBlock = memo(LogoBlockComponent);
LogoBlock.displayName = 'LogoBlock';
