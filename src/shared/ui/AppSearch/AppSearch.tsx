import { lazy, memo, Suspense, useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { setAppSearchSchema } from '@store/slices/contextSlice';

import { isSpotlightSearchBehavior } from '@/shared/config';

import { resolveSearchSchema, type SearchSchema } from './config';

const SearchSpotlightType = lazy(() =>
  import('./type/spotlight/SearchSpotlightType').then((module) => ({
    default: module.SearchSpotlightType,
  })),
);

export type AppSearchProps = {
  /** Override resolved `params.search` schema. */
  schema?: Partial<SearchSchema>;
};

/**
 * Global search host — mounts spotlight only when configured.
 * - `type/modal` → `appSearch.open('modal')` + context modal `search`
 * - `type/spotlight` → this host + shortcut from schema
 * - `type/input` → page results via layout (`SearchInputType`)
 * - `style/*` → trigger chrome in header/aside adapters
 */
function AppSearchComponent({ schema: schemaOverride }: AppSearchProps) {
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    const base = resolveSearchSchema();
    return {
      type: schemaOverride?.type ?? base.type,
      style: schemaOverride?.style ?? base.style,
    };
  }, [schemaOverride]);

  useEffect(() => {
    dispatch(setAppSearchSchema(schema));
  }, [dispatch, schema]);

  if (!isSpotlightSearchBehavior(schema.type)) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <SearchSpotlightType shortcutEnabled />
    </Suspense>
  );
}

export const AppSearch = memo(AppSearchComponent);
AppSearch.displayName = 'AppSearch';
