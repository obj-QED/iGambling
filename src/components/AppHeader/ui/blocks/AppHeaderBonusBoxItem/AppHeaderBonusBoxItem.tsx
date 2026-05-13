import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { IconGift } from '@tabler/icons-react';

import { Button } from '@ui';

import { resolveHeaderActionCopy } from '@AppHeader/lib/headerActionLabels';

type AppHeaderBonusBoxItemProps = {
  item: AppHeaderMenuItem;
};

function AppHeaderBonusBoxItemComponent({ item }: AppHeaderBonusBoxItemProps) {
  const { ariaLabel, visibleLabel } = resolveHeaderActionCopy(item, 'Bonuses');
  const url = item.url?.trim() ?? '';

  return (
    <Button
      url={url}
      aria-label={ariaLabel}
      varsKey="header-btn-login"
      icon={<IconGift size="1em" aria-hidden />}
    >
      {visibleLabel}
    </Button>
  );
}

export const AppHeaderBonusBoxItem = memo(AppHeaderBonusBoxItemComponent);
AppHeaderBonusBoxItem.displayName = 'AppHeaderBonusBoxItem';
