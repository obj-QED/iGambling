import { memo } from 'react';

import { useIsMobile } from '@hooks/useIsMobile';
import { useLanguage } from '@hooks/useLanguage';

import { AppBanner } from '@/widgets/banner';
import { AppFooter } from '@/widgets/footer';
import { AppHeader } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';

import { AppLayoutMain } from './AppLayoutMain';
import { useAppLayout } from './useAppLayout';

import styles from './AppLayout.module.scss';

function AppLayoutComponent() {
  const language = useLanguage();
  const isMobile = useIsMobile();
  const {
    headerMenu,
    headerConfig,
    footerMenu,
    footerSchema,
    sidebarMenu,
    sidebarConfig,
    banner,
    bannerSchema,
  } = useAppLayout(language);

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

export const AppLayout = memo(AppLayoutComponent);
AppLayout.displayName = 'AppLayout';
