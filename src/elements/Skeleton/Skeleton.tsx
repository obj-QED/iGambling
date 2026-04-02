import type { CSSProperties } from 'react';

import styles from './Skeleton.module.scss';

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
};

/** Базовый skeleton-блок. Используется для строительства skeleton-состояний компонентов. */
export function Skeleton({ width, height, borderRadius, className, style }: SkeletonProps) {
  return (
    <div
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}

Skeleton.displayName = 'Skeleton';
