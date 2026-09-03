import type { HeaderMenuModel } from '@/widgets/header';

import { Activity, memo, useEffect, useLayoutEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

import { AppProfiler } from '@/app/performance';

import { useIsMobile } from '@hooks/useIsMobile';

import { SidebarDrawerProvider, useSidebarDrawer } from '@/shared/lib';
import { AppDrawer } from '@/shared/ui';
import { AppBanner } from '@/widgets/banner';
import { AppFooter } from '@/widgets/footer';
import { AppHeader } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';

import { AppLayoutMain } from './AppLayoutMain';
import { lockSidebarWidth } from './lockSidebarWidth';
import { type UseAppLayoutResult } from './useAppLayout';

import styles from './AppLayout.module.scss';

const EMPTY_HEADER_MENU: HeaderMenuModel = { sections: [] };

type AppLayoutChromeProps = Omit<UseAppLayoutResult, 'isReady'> & {
  /** Paint-only skeleton on live chrome — same DOM as ready layout. */
  skeleton?: boolean;
};

function activityMode(isVisible: boolean): 'visible' | 'hidden' {
  if (isVisible) {
    return 'visible';
  }
  return 'hidden';
}

function resolvedMenu(menu: HeaderMenuModel | null): HeaderMenuModel {
  if (menu === null) {
    return EMPTY_HEADER_MENU;
  }
  return menu;
}

type SidebarSlotProps = {
  sidebarMenu: AppLayoutChromeProps['sidebarMenu'];
  sidebarConfig: AppLayoutChromeProps['sidebarConfig'];
  isMobile: boolean;
};

function SidebarSlot({ sidebarMenu, sidebarConfig, isMobile }: SidebarSlotProps) {
  const { opened, close } = useSidebarDrawer();
  const location = useLocation();

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useEffect(() => {
    if (!isMobile) {
      close();
    }
  }, [isMobile, close]);

  const asideClassName = [styles.aside, isMobile ? styles.asideDrawer : null]
    .filter(Boolean)
    .join(' ');

  const sidebar = (
    <AppProfiler id="Sidebar">
      <AppSidebar menu={sidebarMenu} config={sidebarConfig} className={asideClassName} />
    </AppProfiler>
  );

  return (
    <Activity mode={activityMode(true)}>
      {isMobile ? (
        <AppDrawer
          opened={opened}
          onClose={close}
          position="left"
          withCloseButton={false}
          keepMounted
          cmfComponent="layout"
          cmfKey="sidebar"
        >
          {sidebar}
        </AppDrawer>
      ) : (
        sidebar
      )}
    </Activity>
  );
}

function AppLayoutChromeComponent({
  headerMenu,
  headerConfig,
  footerMenu,
  footerSchema,
  sidebarMenu,
  sidebarConfig,
  banner,
  bannerSchema,
  skeleton = false,
}: AppLayoutChromeProps) {
  const isMobile = useIsMobile();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Freeze used width before reveal so late icon/font metrics cannot shift chrome.
    if (!isMobile) {
      lockSidebarWidth(rootRef.current);
    }
  }, [skeleton, sidebarMenu, isMobile]);

  return (
    <SidebarDrawerProvider>
      <div
        ref={rootRef}
        className={styles.root}
        {...(skeleton
          ? {
              'data-shell-skeleton': '',
              'aria-busy': true,
              role: 'status',
              'aria-label': 'Loading layout',
            }
          : {})}
      >
        <SidebarSlot sidebarMenu={sidebarMenu} sidebarConfig={sidebarConfig} isMobile={isMobile} />

        <div className={styles.content}>
          <Activity mode={activityMode(headerMenu !== null)}>
            <AppProfiler id="Header">
              <AppHeader
                menu={resolvedMenu(headerMenu)}
                config={headerConfig}
                className={styles.header}
              />
            </AppProfiler>
          </Activity>

          {banner && <AppBanner banner={banner} schema={bannerSchema} className={styles.banner} />}

          <AppProfiler id="Content">
            <AppLayoutMain />
          </AppProfiler>

          {/* Keep footer out of the first viewport during skeleton — short page → bottom
              footer would teleport below the fold when Home commits. */}
          <Activity mode={activityMode(footerMenu !== null && !skeleton)}>
            <AppProfiler id="Footer">
              <AppFooter
                menu={resolvedMenu(footerMenu)}
                schema={footerSchema}
                className={styles.footer}
              />
            </AppProfiler>
          </Activity>
        </div>
      </div>
    </SidebarDrawerProvider>
  );
}

export const AppLayoutChrome = memo(AppLayoutChromeComponent);
AppLayoutChrome.displayName = 'AppLayoutChrome';
export default AppLayoutChrome;
