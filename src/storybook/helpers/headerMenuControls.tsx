import type { ReactNode } from 'react';

import { createStorybookHeaderMenuFixture, findHeaderMenuItem } from '@/storybook/data';
import { resolveHeaderConfig } from '@/widgets/header/config/resolve';
import { ConfigProvider } from '@/widgets/header/context/provider';

import '@/widgets/header/registry/registerBlocks';

export function getHeaderMenuControlItems() {
  const menu = createStorybookHeaderMenuFixture();

  return {
    menu,
    profileItem: findHeaderMenuItem(menu, 'profile'),
    walletItem: findHeaderMenuItem(menu, 'wallet'),
    searchItem: findHeaderMenuItem(menu, 'search'),
    notificationItem: findHeaderMenuItem(menu, 'notification'),
  };
}

type HeaderMenuControlsShellProps = {
  children: ReactNode;
};

/** Config + block registry for isolated header menu control demos. */
export function HeaderMenuControlsShell({ children }: HeaderMenuControlsShellProps) {
  return <ConfigProvider config={resolveHeaderConfig()}>{children}</ConfigProvider>;
}
