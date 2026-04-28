import type { ReactNode } from 'react';

import styles from './PageLoader.module.scss';

export type PageLoaderProps = {
  children?: ReactNode;
};

/** Suspense fallback while lazy-loading page JS chunk. */
export function PageLoader({ children }: PageLoaderProps) {
  return (
    <div className={styles.root} role="status" aria-label="Загрузка">
      {children}
    </div>
  );
}

PageLoader.displayName = 'PageLoader';
