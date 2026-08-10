import type { PageLayoutMatch } from '../lib/resolvePageLayout';

import { memo } from 'react';

import { Container } from '@mantine/core';
import { Outlet, useMatches } from 'react-router-dom';

import { resolvePageLayoutFromMatches } from '../lib/resolvePageLayout';

import styles from './AppLayout.module.scss';

/**
 * Only the page shell subscribes to route matches — keeps header/aside off the
 * navigation re-render path.
 */
function AppLayoutMainComponent() {
  const pageLayout = resolvePageLayoutFromMatches(useMatches() as unknown as PageLayoutMatch[]);

  return (
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
  );
}

export const AppLayoutMain = memo(AppLayoutMainComponent);
AppLayoutMain.displayName = 'AppLayoutMain';
