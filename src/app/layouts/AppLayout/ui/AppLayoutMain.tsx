import type { PageLayoutMatch } from '../../lib/resolvePageLayout';

import { memo } from 'react';

import { Container } from '@mantine/core';
import clsx from 'clsx';
import { useMatches } from 'react-router-dom';

import { resolvePageLayoutFromMatches } from '../../lib/resolvePageLayout';
import { AppLayoutMainStage } from './AppLayoutMainStage';

import styles from './AppLayout.module.scss';

/**
 * Layout chrome for the page column — layout kind only.
 * Search query / outlet live in `AppLayoutMainStage` so layout size does not
 * re-render on every search keystroke.
 */
function AppLayoutMainComponent() {
  const pageLayout = resolvePageLayoutFromMatches(useMatches() as unknown as PageLayoutMatch[]);

  return (
    <Container
      className={clsx(styles.page, 'cmf-Main-page')}
      component="main"
      size={pageLayout === 'info' ? 'md' : 'responsive'}
    >
      {pageLayout === 'info' ? (
        <div className={styles.infoPageContent}>
          <AppLayoutMainStage />
        </div>
      ) : (
        <AppLayoutMainStage />
      )}
    </Container>
  );
}

export const AppLayoutMain = memo(AppLayoutMainComponent);
AppLayoutMain.displayName = 'AppLayoutMain';
