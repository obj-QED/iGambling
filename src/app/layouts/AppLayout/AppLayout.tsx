import { memo } from 'react';

import { PageDataSync } from '../lib/PageDataSync';
import { useAppLayout, type UseAppLayoutResult } from '../lib/useAppLayout';
import { useShellReveal } from './hooks';
import { AppLayoutChrome } from './ui';

function AppLayoutReady(layout: UseAppLayoutResult) {
  const {
    headerMenu,
    headerConfig,
    footerMenu,
    footerSchema,
    sidebarMenu,
    sidebarConfig,
    banner,
    bannerSchema,
    isReady,
  } = layout;
  const { skeleton } = useShellReveal(isReady);

  return (
    <AppLayoutChrome
      headerMenu={headerMenu}
      headerConfig={headerConfig}
      footerMenu={footerMenu}
      footerSchema={footerSchema}
      sidebarMenu={sidebarMenu}
      sidebarConfig={sidebarConfig}
      banner={banner}
      bannerSchema={bannerSchema}
      skeleton={skeleton}
    />
  );
}

function AppLayoutComponent() {
  const layout = useAppLayout();

  return (
    <>
      <PageDataSync />
      <AppLayoutReady {...layout} />
    </>
  );
}

export const AppLayout = memo(AppLayoutComponent);
AppLayout.displayName = 'AppLayout';
export default AppLayout;
