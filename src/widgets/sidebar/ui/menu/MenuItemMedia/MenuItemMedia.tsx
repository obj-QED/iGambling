import type { HeaderMenuItem } from '@/widgets/header';

import { memo, useCallback, useState } from 'react';

import clsx from 'clsx';

import { hasItemImg, isSvgMediaSrc } from '../../../lib/itemUtils';

import styles from '../../../styles/menu/MenuItemMedia.module.scss';

type MenuItemMediaProps = {
  item: HeaderMenuItem;
  alt: string;
  className?: string;
  onImgError?: () => void;
};

function MenuItemMediaComponent({ item, alt, className, onImgError }: MenuItemMediaProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = useCallback(() => {
    setImgFailed(true);
    onImgError?.();
  }, [onImgError]);

  if (hasItemImg(item) === false || imgFailed === true) return null;

  const src = item.img ?? '';
  const isSvg = isSvgMediaSrc(src);

  return (
    <img
      className={clsx(isSvg ? styles.icon : styles.image, className)}
      src={src}
      alt={alt}
      loading="lazy"
      onError={handleError}
    />
  );
}

export const MenuItemMedia = memo(MenuItemMediaComponent);
MenuItemMedia.displayName = 'MenuItemMedia';
