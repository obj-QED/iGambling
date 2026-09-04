import type { CmfIconProps } from './types';
import type { Ref } from 'react';

import { forwardRef, memo, useCallback, useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import SVG from 'react-inlinesvg';

import {
  cmfIconDataAttrs,
  htmlImageNaturalSizeIsReliable,
  isBrokenHtmlImage,
  isSvgMediaSrc,
} from '@/shared/lib/cmfIcon';

import styles from './styles.module.scss';

export type { CmfIconProps } from './types';

function assignRef<T>(ref: Ref<T> | undefined, node: T | null): void {
  if (typeof ref === 'function') {
    ref(node);
    return;
  }
  if (ref) {
    ref.current = node;
  }
}

export const CmfIcon = memo(
  forwardRef<HTMLImageElement | HTMLSpanElement | SVGSVGElement, CmfIconProps>(function CmfIcon(
    { src, alt, shape = 'square', radius = 'sm', className, onError },
    ref,
  ) {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const imgNodeRef = useRef<HTMLImageElement | null>(null);
    const reportedSrcRef = useRef<string | null>(null);
    const srcRef = useRef(src);
    const hidden = failedSrc === src;

    const handleError = useCallback(() => {
      if (reportedSrcRef.current === src) {
        return;
      }
      reportedSrcRef.current = src;
      setFailedSrc(src);
      onError?.();
    }, [onError, src]);

    if (srcRef.current !== src) {
      srcRef.current = src;
      reportedSrcRef.current = null;
    }

    useLayoutEffect(() => {
      const node = imgNodeRef.current;
      if (node && htmlImageNaturalSizeIsReliable() && isBrokenHtmlImage(node)) {
        handleError();
      }
    }, [handleError, src]);

    const setImgRef = useCallback(
      (node: HTMLImageElement | null) => {
        imgNodeRef.current = node;
        assignRef(ref as Ref<HTMLImageElement | HTMLSpanElement | SVGSVGElement> | undefined, node);
        if (node && htmlImageNaturalSizeIsReliable() && isBrokenHtmlImage(node)) {
          handleError();
        }
      },
      [handleError, ref],
    );

    const rootClassName = clsx(styles.root, className, { hidden });

    const dataAttrs = cmfIconDataAttrs(src, shape, radius);

    if (isSvgMediaSrc(src) === true) {
      return (
        <SVG
          src={src}
          innerRef={ref as Ref<SVGElement>}
          className={rootClassName}
          role="img"
          aria-label={alt}
          onError={handleError}
          {...dataAttrs}
        />
      );
    }

    return (
      <img
        ref={setImgRef}
        className={rootClassName}
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={handleError}
        {...dataAttrs}
      />
    );
  }),
);

CmfIcon.displayName = 'CmfIcon';
