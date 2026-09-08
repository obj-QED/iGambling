import type { HeaderMenuModel } from '@/widgets/header';

import { Activity, memo, useEffect, useLayoutEffect, useRef } from 'react';

import clsx from 'clsx';

import { useIsMobile } from '@hooks/useIsMobile';

import { useCloseOnPathnameChange } from '@/shared/hooks';
import { AppDrawer, AppDrawerProvider, useAppDrawerContext } from '@/shared/ui';
import { AppBanner } from '@/widgets/banner';
import { AppFooter } from '@/widgets/footer';
import { AppHeader } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';
import { toSidebarWidthCss } from '@/widgets/sidebar/lib';

import { AppLayoutMain } from './AppLayoutMain';
import { lockSidebarWidth, unlockSidebarWidth } from './lockSidebarWidth';
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
  const { opened, close } = useAppDrawerContext();

  // Pathname store — not `useLocation` — so this slot stays off the RR re-render path.
  useCloseOnPathnameChange(close);

  useEffect(() => {
    if (!isMobile) {
      close();
    }
  }, [isMobile, close]);

  const asideClassName = [styles.aside, isMobile ? styles.asideDrawer : null]
    .filter(Boolean)
    .join(' ');

  const sidebar = (
    <AppSidebar
      menu={sidebarMenu}
      config={sidebarConfig}
      className={clsx(asideClassName, 'cmf-Sidebar')}
    />
  );

  /**
   * Only pass Mantine `size` when settings set it (aside.drawer.size / width).
   * Otherwise omit — AppDrawer CSS nest owns width via
   * `--cmf-drawer-layout-sidebar-size-{band|}` on `:root` (Mantine `size` would
   * paint `--drawer-size` and fight the token cascade).
   */
  const drawerSize = sidebarConfig.drawer?.size ?? toSidebarWidthCss(sidebarConfig.width);

  return isMobile ? (
    <AppDrawer
      opened={opened}
      onClose={close}
      position="left"
      title={false}
      withCloseButton={false}
      keepMounted
      defaults={sidebarConfig.drawer}
      {...(drawerSize != null ? { size: drawerSize } : {})}
      data-cmf-component="layout"
      data-cmf-key="sidebar"
    >
      {sidebar}
    </AppDrawer>
  ) : (
    sidebar
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
    if (isMobile) {
      return;
    }
    // Freeze only while shell skeleton paints; unlock so CSS tokens own live width.
    if (skeleton) {
      lockSidebarWidth(rootRef.current);
      return;
    }
    unlockSidebarWidth(rootRef.current);
  }, [skeleton, sidebarMenu, isMobile]);

  return (
    <AppDrawerProvider>
      <div
        ref={rootRef}
        className={clsx(styles.root, 'cmf-Layout')}
        data-cmf-component="layout"
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

        <div className={clsx(styles.content, 'cmf-Layout-content')}>
          <Activity mode={activityMode(headerMenu !== null)}>
            <AppHeader
              menu={resolvedMenu(headerMenu)}
              config={headerConfig}
              className={styles.header}
            />
          </Activity>

          {banner && <AppBanner banner={banner} schema={bannerSchema} className={styles.banner} />}

          <AppLayoutMain />

          {/* Keep footer out of the first viewport during skeleton — short page → bottom
              footer would teleport below the fold when Home commits. */}
          <Activity mode={activityMode(footerMenu !== null && !skeleton)}>
            <AppFooter
              menu={resolvedMenu(footerMenu)}
              schema={footerSchema}
              className={styles.footer}
            />
          </Activity>
        </div>
      </div>
    </AppDrawerProvider>
  );
}

export const AppLayoutChrome = memo(AppLayoutChromeComponent);
AppLayoutChrome.displayName = 'AppLayoutChrome';
export default AppLayoutChrome;
