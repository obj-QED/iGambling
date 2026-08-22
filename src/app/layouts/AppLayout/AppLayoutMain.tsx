import type { PageLayoutMatch } from '../lib/resolvePageLayout';

import { memo, Suspense } from 'react';

import { Container } from '@mantine/core';
import { Outlet, useMatches } from 'react-router-dom';

import { resolvePageLayoutFromMatches } from '../lib/resolvePageLayout';
import { AppPageSkeleton } from './AppPageSkeleton';

import styles from './AppLayout.module.scss';

/**
 * Only the page shell subscribes to route matches — keeps header/aside off the
 * navigation re-render path.
 * Page Suspense must NOT use `AdapterPendingFallback` — that would hold shell
 * skeleton / BootGate until the whole route chunk loads.
 */
function AppLayoutMainComponent() {
  const pageLayout = resolvePageLayoutFromMatches(useMatches() as unknown as PageLayoutMatch[]);

  const page = (
    <Suspense fallback={<AppPageSkeleton />}>
      <Outlet />
    </Suspense>
  );

  return (
    <Container
      className={styles.page}
      component="main"
      size={pageLayout === 'info' ? 'md' : 'responsive'}
    >
      {pageLayout === 'info' ? <div className={styles.infoPageContent}>{page}</div> : page}
    </Container>
  );
}

export const AppLayoutMain = memo(AppLayoutMainComponent);
AppLayoutMain.displayName = 'AppLayoutMain';
