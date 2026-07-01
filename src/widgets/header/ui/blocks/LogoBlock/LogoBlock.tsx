import type { BlockProps } from '../../../types';

import { memo, useState } from 'react';

import { AppLink } from '@/shared/ui';

import { isRenderableItem, resolveItemHref, resolveItemLabel } from '../../../lib/itemUtils';

import styles from '../../../styles/blocks/LogoBlock.module.scss';

function LogoBlockComponent({ item }: BlockProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (isRenderableItem(item) === false) return null;

  const href = resolveItemHref(item.url);
  const alt = resolveItemLabel(item);
  const hasImg = (item.img?.length ?? 0) > 0;

  if (hasImg === false) {
    return (
      <AppLink href={href} className={styles.textLogo} data-menu-key={item.key}>
        {alt}
      </AppLink>
    );
  }

  if (imgFailed === true) return null;

  return (
    <AppLink href={href} className={styles.root} data-menu-key={item.key}>
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
    </AppLink>
  );
}

export const LogoBlock = memo(LogoBlockComponent);
LogoBlock.displayName = 'LogoBlock';
