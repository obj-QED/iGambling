import { memo } from 'react';

import { Container } from '@mantine/core';
import { Outlet, useMatches } from 'react-router-dom';

import { useIsMobile } from '@hooks/useIsMobile';
import { useLanguage } from '@hooks/useLanguage';

import { AppBanner } from '@/widgets/banner';
import { AppFooter } from '@/widgets/footer';
import { AppHeader } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';

import { type PageLayoutMatch, resolvePageLayoutFromMatches } from '../lib/resolvePageLayout';
import { useAppLayout } from './useAppLayout';

import styles from './AppLayout.module.scss';

function AppLayoutComponent() {
  const language = useLanguage();
  const isMobile = useIsMobile();
  const { headerMenu, headerConfig, footerMenu, sidebarMenu, sidebarConfig, banner } =
    useAppLayout(language);
  const pageLayout = resolvePageLayoutFromMatches(useMatches() as unknown as PageLayoutMatch[]);

  return (
    <div className={styles.root}>
      {!isMobile ? (
        <AppSidebar menu={sidebarMenu} config={sidebarConfig} className={styles.aside} />
      ) : null}

      <div className={styles.content}>
        {headerMenu ? (
          <AppHeader menu={headerMenu} config={headerConfig} className={styles.header} />
        ) : null}

        {banner ? <AppBanner banner={banner} className={styles.banner} /> : null}

        <Container
          className={styles.page}
          component="main"
          size={pageLayout === 'info' ? 'md' : 'responsive'}
        >
          {pageLayout === 'info' ? (
            <div className={styles.infoPageContent}>
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </Container>

        {footerMenu ? <AppFooter menu={footerMenu} className={styles.footer} /> : null}
      </div>
    </div>
  );
}

export const AppLayout = memo(AppLayoutComponent);
AppLayout.displayName = 'AppLayout';
