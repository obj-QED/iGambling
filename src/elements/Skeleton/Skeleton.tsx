import type { CSSProperties } from 'react';

import { memo, useMemo } from 'react';

import styles from './Skeleton.module.scss';

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
};

function SkeletonComponent({ width, height, borderRadius, className, style }: SkeletonProps) {
  const mergedStyle = useMemo(
    () => ({ width, height, borderRadius, ...style }),
    [width, height, borderRadius, style],
  );

  return (
    <div
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      style={mergedStyle}
      aria-hidden="true"
    />
  );
}

export const Skeleton = memo(SkeletonComponent);
Skeleton.displayName = 'Skeleton';
