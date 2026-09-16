import type { MenuModel as HeaderMenuModel } from '@/entities/menu';
import type { SidebarConfig } from '@/widgets/sidebar';

import clsx from 'clsx';

import { useCloseOnPathnameChange } from '@/shared/hooks';
import { AppDrawer, useAppDrawerContext } from '@/shared/ui';
import { AppSidebar, toSidebarWidthCss } from '@/widgets/sidebar';

import styles from '../styles/AppLayout.module.scss';

export type SidebarChromeProps = {
  sidebarMenu: HeaderMenuModel;
  sidebarConfig: SidebarConfig;
};

function SidebarRailChrome({ sidebarMenu, sidebarConfig }: SidebarChromeProps) {
  return (
    <AppSidebar
      menu={sidebarMenu}
      config={sidebarConfig}
      className={clsx(styles.aside, 'cmf-Sidebar')}
    />
  );
}

function SidebarDrawerChrome({ sidebarMenu, sidebarConfig }: SidebarChromeProps) {
  const { opened, close } = useAppDrawerContext();
  useCloseOnPathnameChange(close);

  const drawerSize = sidebarConfig.drawer?.size ?? toSidebarWidthCss(sidebarConfig.width);

  return (
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
      <AppSidebar
        menu={sidebarMenu}
        config={sidebarConfig}
        className={clsx(styles.aside, styles.asideDrawer, 'cmf-Sidebar')}
      />
    </AppDrawer>
  );
}

/** Behavioral chrome — only the active representation mounts (rail | drawer). */
export const SIDEBAR_CHROME_REGISTRY = {
  rail: SidebarRailChrome,
  drawer: SidebarDrawerChrome,
} as const;

export type SidebarChromeKey = keyof typeof SIDEBAR_CHROME_REGISTRY;
