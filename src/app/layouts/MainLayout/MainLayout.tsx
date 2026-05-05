import { memo, Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { AppBanner, AppFooter, AppHeader, AppSidebar } from '@/components';

import styles from './MainLayout.module.scss';

/**
 * Main shell layout (flex, not Mantine Grid):
 * Mantine `Grid` here fought sticky sidebar width + flex-basis rules and could collapse the main column (header gone).
 * Use Mantine Grid inside page content where you control spans.
 *
 * - below `md`: sidebar stacks above content
 * - `md` and up: sidebar column + main column
 */
function MainLayoutComponent() {
  return (
    <div className={styles.root}>
      <Suspense>
        <AppSidebar />
      </Suspense>
      <div className={styles.body}>
        <AppHeader />
        <Suspense>
          <AppBanner />
        </Suspense>
        <main className={styles.content}>
          <Outlet />
        </main>
        <Suspense>
          <AppFooter />
        </Suspense>
      </div>
    </div>
  );
}

export const MainLayout = memo(MainLayoutComponent);
MainLayout.displayName = 'MainLayout';
