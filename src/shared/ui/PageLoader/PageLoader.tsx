import type { ReactNode } from 'react';

import styles from './PageLoader.module.scss';

export type PageLoaderProps = {
  children?: ReactNode;
};

/** Lightweight fallback while a lazy route chunk loads (not the global bootstrap preloader). */
export function PageLoader({ children }: PageLoaderProps) {
  return (
    <div className={styles.root} role="status" aria-label="Loading">
      {children ?? 'Loading…'}
    </div>
  );
}

PageLoader.displayName = 'PageLoader';
