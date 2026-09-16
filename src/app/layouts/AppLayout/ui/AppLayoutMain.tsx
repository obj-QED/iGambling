import { memo } from 'react';

import { Container } from '@mantine/core';
import clsx from 'clsx';

import { AppLayoutMainStage } from './AppLayoutMainStage';

import styles from './AppLayout.module.scss';

/**
 * Layout chrome for the page column.
 * Search query / outlet live in `AppLayoutMainStage` so layout size does not
 * re-render on every search keystroke.
 */
function AppLayoutMainComponent() {
  return (
    <Container className={clsx(styles.page, 'cmf-Main-page')} component="main" size="responsive">
      <AppLayoutMainStage />
    </Container>
  );
}

export const AppLayoutMain = memo(AppLayoutMainComponent);
AppLayoutMain.displayName = 'AppLayoutMain';
