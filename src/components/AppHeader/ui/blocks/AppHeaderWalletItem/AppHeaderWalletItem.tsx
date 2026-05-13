import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { IconWallet } from '@tabler/icons-react';

import { Button } from '@ui';

type AppHeaderWalletItemProps = {
  item: AppHeaderMenuItem;
};

function AppHeaderWalletItemComponent({ item }: AppHeaderWalletItemProps) {
  const label = item.name?.trim() || 'wallet';
  const url = item.url?.trim() ?? '';

  return (
    <Button
      url={url}
      aria-label={label}
      varsKey="header-btn-login"
      icon={<IconWallet size="1em" aria-hidden />}
    >
      {label}
    </Button>
  );
}

export const AppHeaderWalletItem = memo(AppHeaderWalletItemComponent);
AppHeaderWalletItem.displayName = 'AppHeaderWalletItem';
