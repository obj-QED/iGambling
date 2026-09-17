import type { SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';

import { memo, useMemo, useState, useSyncExternalStore } from 'react';

import { Spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import {
  getKnownAppPathLabelsSnapshot,
  getKnownAppPathsSnapshot,
  getKnownAppPathsVersion,
  subscribeKnownAppPaths,
} from '@api/lobby/lib/knownAppPathsStore';

import { resolveSpotlightProps } from '@/shared/config';

import { appSpotlightStore, DATA_SEARCH } from '../../lib';
import { buildSpotlightPageActions } from '../../lib/buildSpotlightPageActions';

export type SearchSpotlightTypeProps = {
  actions?: (SpotlightActionData | SpotlightActionGroupData)[];
  /** When false, hotkeys disabled (host still mounts for `appSearch.open('spotlight')`). */
  shortcutEnabled?: boolean;
};

/** `type: spotlight` — Mantine command center + known lobby pages. */
function SearchSpotlightTypeComponent({
  actions: actionsProp,
  shortcutEnabled = true,
}: SearchSpotlightTypeProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const knownVersion = useSyncExternalStore(
    subscribeKnownAppPaths,
    getKnownAppPathsVersion,
    getKnownAppPathsVersion,
  );

  const pageActions = useMemo(
    () =>
      buildSpotlightPageActions({
        query,
        navigate: (to) => {
          void navigate(to);
        },
        knownPaths: getKnownAppPathsSnapshot(),
        labels: getKnownAppPathLabelsSnapshot(),
      }),
    [navigate, query, knownVersion],
  );

  const spotlightProps = resolveSpotlightProps({
    nothingFound: 'Nothing found...',
    highlightQuery: true,
    limit: 7,
    shortcut: shortcutEnabled ? ['mod + K'] : null,
    searchProps: {
      ...DATA_SEARCH,
      leftSection: <IconSearch size={20} stroke={1.75} aria-hidden />,
      placeholder: 'Search pages...',
      wrapperProps: {
        ...DATA_SEARCH,
        'data-search-part': 'field',
      },
    },
  });

  return (
    <Spotlight
      store={appSpotlightStore}
      actions={actionsProp ?? pageActions}
      query={query}
      onQueryChange={setQuery}
      {...DATA_SEARCH}
      data-search-type="spotlight"
      {...spotlightProps}
    />
  );
}

export const SearchSpotlightType = memo(SearchSpotlightTypeComponent);
SearchSpotlightType.displayName = 'SearchSpotlightType';
