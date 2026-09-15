import type { PageLayoutMatch } from '../../lib/resolvePageLayout';

import { lazy, memo, Suspense } from 'react';

import { Container } from '@mantine/core';
import clsx from 'clsx';
import { Outlet, useMatches } from 'react-router-dom';

import {
  resolveSearchSchema,
  shouldShowSearchResults,
  useSearchPageMode,
  useSearchQuery,
} from '@/shared/ui';

import { resolvePageLayoutFromMatches } from '../../lib/resolvePageLayout';
import { AppPageSkeleton } from './AppPageSkeleton';

import styles from './AppLayout.module.scss';

const SearchResults = lazy(() =>
  import('@/shared/ui/AppSearch/type/input/SearchInputType').then((module) => ({
    default: module.SearchInputType,
  })),
);

/**
 * Only the page shell subscribes to route matches — keeps header/aside off the
 * navigation re-render path.
 * Page Suspense must NOT use `AdapterPendingFallback` — that would hold shell
 * skeleton / BootGate until the whole route chunk loads.
 */
function AppLayoutMainComponent() {
  const pageLayout = resolvePageLayoutFromMatches(useMatches() as unknown as PageLayoutMatch[]);
  const query = useSearchQuery();
  const pageMode = useSearchPageMode();
  const globalType = resolveSearchSchema().type;
  const showResults = shouldShowSearchResults({ query, pageMode, globalType });

  const page = showResults ? (
    <Suspense fallback={<AppPageSkeleton />}>
      <SearchResults query={query} />
    </Suspense>
  ) : (
    <Suspense fallback={<AppPageSkeleton />}>
      <Outlet />
    </Suspense>
  );

  return (
    <Container
      className={clsx(styles.page, 'cmf-Main-page')}
      component="main"
      size={pageLayout === 'info' ? 'md' : 'responsive'}
    >
      {pageLayout === 'info' ? <div className={styles.infoPageContent}>{page}</div> : page}
    </Container>
  );
}

export const AppLayoutMain = memo(AppLayoutMainComponent);
AppLayoutMain.displayName = 'AppLayoutMain';
