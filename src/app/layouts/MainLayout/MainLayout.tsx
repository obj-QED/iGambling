import { Outlet } from 'react-router-dom';

import { AppBanner } from '@/components/AppBanner';
import { AppFooter } from '@/components/AppFooter';
import { AppHeader } from '@/components/AppHeader';
import { AppSidebar } from '@/components/AppSidebar';

import styles from './MainLayout.module.scss';

/**
 * Основной layout:
 * ┌──────────┬──────────────────────┐
 * │          │      AppHeader       │
 * │ Sidebar  │      AppBanner       │
 * │          │      Content         │
 * │          │      AppFooter       │
 * └──────────┴──────────────────────┘
 *
 * Sidebar при открытии плавно расширяется — body (flex:1) двигается вправо.
 */
export function MainLayout() {
  return (
    <div className={styles.root}>
      <AppSidebar />
      <div className={styles.body}>
        <AppHeader />
        <AppBanner />
        <main className={styles.content}>
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}

MainLayout.displayName = 'MainLayout';
