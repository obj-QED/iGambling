import { memo } from 'react';

import { Container } from '@mantine/core';
import clsx from 'clsx';

import { resolveOutletLayout } from '@/shared/config';

import { AppLayoutMainStage } from './AppLayoutMainStage';

import styles from '../styles/AppLayout.module.scss';

/**
 * Layout chrome for the page column.
 * Width mode from `params.outlet.layout` (`container` | `container-fluid`).
 * Search query / outlet live in `AppLayoutMainStage` so layout size does not
 * re-render on every search keystroke.
 */
function AppLayoutMainComponent() {
  const layout = resolveOutletLayout();
  const fluid = layout === 'container-fluid';

  return (
    <Container
      className={clsx(styles.page, 'cmf-Main-page')}
      component="main"
      data-outlet-layout={layout}
      {...(fluid ? { fluid: true } : { size: 'responsive' as const })}
    >
      <AppLayoutMainStage />
    </Container>
  );
}

export const AppLayoutMain = memo(AppLayoutMainComponent);
AppLayoutMain.displayName = 'AppLayoutMain';
