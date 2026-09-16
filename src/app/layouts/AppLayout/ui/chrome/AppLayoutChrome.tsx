import type { MenuModel as HeaderMenuModel } from '@/entities/menu';

import { Activity, memo, useLayoutEffect, useRef } from 'react';

import clsx from 'clsx';

import { useIsMobile } from '@hooks/useIsMobile';

import { AppDrawerProvider, AppSearch } from '@/shared/ui';
import { AppBanner } from '@/widgets/banner';
import { AppFooter } from '@/widgets/footer';
import { AppHeader } from '@/widgets/header';

import { type UseAppLayoutResult } from '../../../lib/useAppLayout';
import { lockSidebarWidth, unlockSidebarWidth } from '../../lib';
import { AppLayoutMain } from '../main';
import { SidebarSlot } from './SidebarSlot';

import styles from '../styles/AppLayout.module.scss';

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
  const sidebarChrome = isMobile ? 'drawer' : 'rail';
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (sidebarChrome === 'drawer') {
      return;
    }
    if (skeleton) {
      lockSidebarWidth(rootRef.current);
      return;
    }
    unlockSidebarWidth(rootRef.current);
  }, [skeleton, sidebarMenu, sidebarChrome]);

  return (
    <AppDrawerProvider>
      <AppSearch />
      <div
        ref={rootRef}
        className={clsx(styles.root, 'cmf-Layout')}
        data-cmf-component="layout"
        data-sidebar-chrome={sidebarChrome}
        {...(skeleton
          ? {
              'data-shell-skeleton': '',
              'aria-busy': true,
              role: 'status',
              'aria-label': 'Loading layout',
            }
          : {})}
      >
        <SidebarSlot
          chrome={sidebarChrome}
          sidebarMenu={resolvedMenu(sidebarMenu)}
          sidebarConfig={sidebarConfig}
        />

        <div className={clsx(styles.content, 'cmf-Layout-content')}>
          <Activity mode={activityMode(skeleton || headerMenu !== null)}>
            <AppHeader
              menu={resolvedMenu(headerMenu)}
              config={headerConfig}
              className={styles.header}
            />
          </Activity>

          {banner && <AppBanner banner={banner} schema={bannerSchema} className={styles.banner} />}

          <AppLayoutMain />

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
