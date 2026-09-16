import { lazy, memo, Suspense } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { useOutlet } from 'react-router-dom';

import { INFO_CONTENT_MASK } from '@/shared/lib/motion';
import {
  resolveSearchSchema,
  shouldShowSearchResults,
  useSearchPageMode,
  useSearchQuery,
} from '@/shared/ui';

import styles from '../styles/AppLayout.module.scss';

const SearchResults = lazy(() =>
  import('@/shared/ui/AppSearch/type/input/SearchInputType').then((module) => ({
    default: module.SearchInputType,
  })),
);

/**
 * Page body only — search ↔ route swap.
 * Per-pathname wipes live in `AppearWipe` (Info CMS). Keying this stage by
 * pathname remounted every nav → double wipe + info HTML flashing on Home.
 * Loader still holds the previous route until `getPage` settles (no empty flash).
 */
function AppLayoutMainStageComponent() {
  const query = useSearchQuery();
  const pageMode = useSearchPageMode();
  const outlet = useOutlet();
  const globalType = resolveSearchSchema().type;
  const showResults = shouldShowSearchResults({ query, pageMode, globalType });
  const stageKey = showResults ? 'search' : 'page';

  return (
    <div className={styles.stage}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stageKey}
          className={styles.stagePanel}
          initial={INFO_CONTENT_MASK.initial}
          animate={INFO_CONTENT_MASK.animate}
          exit={INFO_CONTENT_MASK.exit}
          transition={INFO_CONTENT_MASK.transition}
        >
          {showResults ? (
            <Suspense fallback={null}>
              <SearchResults query={query} />
            </Suspense>
          ) : (
            <Suspense fallback={null}>{outlet}</Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const AppLayoutMainStage = memo(AppLayoutMainStageComponent);
AppLayoutMainStage.displayName = 'AppLayoutMainStage';
