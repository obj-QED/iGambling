import type { HeaderMenuIconRadius, HeaderMenuIconShape } from '../../../types';
import type { Ref } from 'react';

import { forwardRef, memo, useCallback, useState } from 'react';

import clsx from 'clsx';
import SVG from 'react-inlinesvg';

import { isSvgMediaSrc, menuItemIconDataAttrs } from '../../../lib/menuItemIcon';

import styles from '../../../styles/menu/ItemIcon.module.scss';

type ItemIconProps = {
  src: string;
  alt: string;
  shape?: HeaderMenuIconShape;
  radius?: HeaderMenuIconRadius;
  className?: string;
  inActionIcon?: boolean;
  onError?: () => void;
};

function ItemIconComponent(
  {
    src,
    alt,
    shape = 'square',
    radius = 'sm',
    className,
    inActionIcon = false,
    onError,
  }: ItemIconProps,
  ref: Ref<HTMLImageElement | HTMLSpanElement>,
) {
  const [hidden, setHidden] = useState(false);

  const handleError = useCallback(() => {
    setHidden(true);
    onError?.();
  }, [onError]);

  const rootClassName = clsx(
    styles.root,
    styles[`shape_${shape}`],
    styles[`radius_${radius}`],
    inActionIcon && styles.inActionIcon,
    hidden && styles.hidden,
    className,
  );
  const iconDataAttrs = menuItemIconDataAttrs(shape, radius);

  if (isSvgMediaSrc(src)) {
    return (
      <span ref={ref} className={rootClassName} role="img" aria-label={alt} {...iconDataAttrs}>
        <SVG src={src} className={styles.svg} onError={handleError} aria-hidden />
      </span>
    );
  }

  return (
    <img
      ref={ref}
      className={rootClassName}
      src={src}
      alt={alt}
      loading="lazy"
      onError={handleError}
      {...iconDataAttrs}
    />
  );
}

export const ItemIcon = memo(forwardRef(ItemIconComponent));
ItemIcon.displayName = 'ItemIcon';
