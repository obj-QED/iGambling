import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { Button } from '@ui';

type AppHeaderSearchItemProps = {
  item: AppHeaderMenuItem;
};

function AppHeaderSearchItemComponent({ item }: AppHeaderSearchItemProps) {
  const label = item.name?.trim() || 'search';
  const url = item.url?.trim() ?? '';

  return (
    <Button
      url={url}
      aria-label={label}
      varsKey="header-btn-login"
      icon={<IconSearch size="1em" aria-hidden />}
    >
      {label}
    </Button>
  );
}

export const AppHeaderSearchItem = memo(AppHeaderSearchItemComponent);
AppHeaderSearchItem.displayName = 'AppHeaderSearchItem';
