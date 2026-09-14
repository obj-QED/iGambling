import type { SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';

import { memo, useMemo } from 'react';

import { Spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { resolveSpotlightProps } from '@/shared/config';

import { appSpotlightStore } from '../../lib';

export type SearchSpotlightTypeProps = {
  actions?: (SpotlightActionData | SpotlightActionGroupData)[];
  /** When false, hotkeys disabled (host still mounts for `appSearch.open('spotlight')`). */
  shortcutEnabled?: boolean;
};

/** `type: spotlight` — Mantine command center. */
function SearchSpotlightTypeComponent({
  actions: actionsProp,
  shortcutEnabled = true,
}: SearchSpotlightTypeProps) {
  const navigate = useNavigate();

  const defaultActions = useMemo((): SpotlightActionData[] => {
    return [
      {
        id: 'home',
        label: 'Home',
        description: 'Go to home page',
        onClick: () => {
          void navigate('/');
        },
      },
      {
        id: 'profile',
        label: 'Profile',
        description: 'Open profile',
        onClick: () => {
          void navigate('/profile');
        },
      },
    ];
  }, [navigate]);

  const spotlightProps = resolveSpotlightProps({
    nothingFound: 'Nothing found...',
    highlightQuery: true,
    limit: 7,
    shortcut: shortcutEnabled ? ['mod + K'] : null,
    searchProps: {
      leftSection: <IconSearch size={20} stroke={1.75} aria-hidden />,
      placeholder: 'Search...',
    },
  });

  return (
    <Spotlight
      store={appSpotlightStore}
      actions={actionsProp ?? defaultActions}
      {...spotlightProps}
    />
  );
}

export const SearchSpotlightType = memo(SearchSpotlightTypeComponent);
SearchSpotlightType.displayName = 'SearchSpotlightType';
