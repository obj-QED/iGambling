import type { CmfIconProps } from './types';
import type { Ref } from 'react';

import { forwardRef, memo, useCallback, useState } from 'react';

import clsx from 'clsx';
import SVG from 'react-inlinesvg';

import { cmfIconDataAttrs, isSvgMediaSrc } from '@/shared/lib/cmfIcon';

import styles from './styles.module.scss';

export type { CmfIconProps } from './types';

export const CmfIcon = memo(
  forwardRef<HTMLImageElement | HTMLSpanElement, CmfIconProps>(function CmfIcon(
    { src, alt, shape = 'square', radius = 'sm', className, onError },
    ref,
  ) {
    const [hidden, setHidden] = useState(false);

    const handleError = useCallback(() => {
      setHidden(true);
      onError?.();
    }, [onError]);

    const rootClassName = clsx(styles.root, className, { hidden });

    const dataAttrs = cmfIconDataAttrs(src, shape, radius);

    if (isSvgMediaSrc(src) === true) {
      return (
        <span
          ref={ref as Ref<HTMLSpanElement>}
          className={rootClassName}
          role="img"
          aria-label={alt}
          {...dataAttrs}
        >
          <SVG src={src} data-src={src} onError={handleError} aria-hidden />
        </span>
      );
    }

    return (
      <img
        ref={ref as Ref<HTMLImageElement>}
        className={rootClassName}
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        {...dataAttrs}
      />
    );
  }),
);

CmfIcon.displayName = 'CmfIcon';
