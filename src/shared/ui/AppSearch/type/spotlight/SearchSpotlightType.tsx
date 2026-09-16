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

import { appSpotlightStore } from '../../lib';
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
      leftSection: <IconSearch size={20} stroke={1.75} aria-hidden />,
      placeholder: 'Search pages...',
    },
  });

  return (
    <Spotlight
      store={appSpotlightStore}
      actions={actionsProp ?? pageActions}
      query={query}
      onQueryChange={setQuery}
      {...spotlightProps}
    />
  );
}

export const SearchSpotlightType = memo(SearchSpotlightTypeComponent);
SearchSpotlightType.displayName = 'SearchSpotlightType';
