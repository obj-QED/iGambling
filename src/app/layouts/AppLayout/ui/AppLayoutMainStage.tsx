import { lazy, memo, Suspense } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { Outlet } from 'react-router-dom';

import { SEARCH_STAGE_SLIDE } from '@/shared/lib/motion';
import {
  resolveSearchSchema,
  shouldShowSearchResults,
  useSearchPageMode,
  useSearchQuery,
} from '@/shared/ui';

import { AppPageSkeleton } from './AppPageSkeleton';

import styles from './AppLayout.module.scss';

const SearchResults = lazy(() =>
  import('@/shared/ui/AppSearch/type/input/SearchInputType').then((module) => ({
    default: module.SearchInputType,
  })),
);

/**
 * Page body only — search ↔ outlet swap.
 * `mode="wait"`: current exits left, then next enters from the right.
 */
function AppLayoutMainStageComponent() {
  const query = useSearchQuery();
  const pageMode = useSearchPageMode();
  const globalType = resolveSearchSchema().type;
  const showResults = shouldShowSearchResults({ query, pageMode, globalType });
  const stageKey = showResults ? 'search' : 'page';

  return (
    <div className={styles.stage}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stageKey}
          className={styles.stagePanel}
          initial={SEARCH_STAGE_SLIDE.initial}
          animate={SEARCH_STAGE_SLIDE.animate}
          exit={SEARCH_STAGE_SLIDE.exit}
          transition={SEARCH_STAGE_SLIDE.transition}
        >
          {showResults ? (
            <Suspense fallback={<AppPageSkeleton />}>
              <SearchResults query={query} />
            </Suspense>
          ) : (
            /* null — not AppPageSkeleton: info mask / getPage must keep prior HTML visible */
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const AppLayoutMainStage = memo(AppLayoutMainStageComponent);
AppLayoutMainStage.displayName = 'AppLayoutMainStage';
