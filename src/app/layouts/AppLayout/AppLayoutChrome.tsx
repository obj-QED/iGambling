import type { UseAppLayoutResult } from './useAppLayout';

import { memo } from 'react';

import { AppBanner } from '@/widgets/banner';
import { AppFooter } from '@/widgets/footer';
import { AppHeader } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';

import { AppLayoutMain } from './AppLayoutMain';

import styles from './AppLayout.module.scss';

type AppLayoutChromeProps = Pick<
  UseAppLayoutResult,
  | 'headerMenu'
  | 'headerConfig'
  | 'footerMenu'
  | 'footerSchema'
  | 'sidebarMenu'
  | 'sidebarConfig'
  | 'banner'
  | 'bannerSchema'
> & {
  isMobile: boolean;
};

/**
 * Memoized chrome shell — stable menu/config props skip re-render when only
 * the route outlet (`AppLayoutMain`) updates.
 */
function AppLayoutChromeComponent({
  isMobile,
  headerMenu,
  headerConfig,
  footerMenu,
  footerSchema,
  sidebarMenu,
  sidebarConfig,
  banner,
  bannerSchema,
}: AppLayoutChromeProps) {
  return (
    <div className={styles.root}>
      {!isMobile && (
        <AppSidebar menu={sidebarMenu} config={sidebarConfig} className={styles.aside} />
      )}

      <div className={styles.content}>
        {headerMenu && (
          <AppHeader menu={headerMenu} config={headerConfig} className={styles.header} />
        )}

        {banner && <AppBanner banner={banner} schema={bannerSchema} className={styles.banner} />}

        <AppLayoutMain />

        {footerMenu && (
          <AppFooter menu={footerMenu} schema={footerSchema} className={styles.footer} />
        )}
      </div>
    </div>
  );
}

export const AppLayoutChrome = memo(AppLayoutChromeComponent);
AppLayoutChrome.displayName = 'AppLayoutChrome';
