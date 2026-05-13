import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { IconBell } from '@tabler/icons-react';

import { Button } from '@ui';

import { resolveHeaderActionCopy } from '@AppHeader/lib/headerActionLabels';

type AppHeaderNotificationItemProps = {
  item: AppHeaderMenuItem;
};

function AppHeaderNotificationItemComponent({ item }: AppHeaderNotificationItemProps) {
  const { ariaLabel, visibleLabel } = resolveHeaderActionCopy(item, 'Notifications');
  const url = item.url?.trim() ?? '';

  return (
    <Button
      url={url}
      aria-label={ariaLabel}
      varsKey="header-btn-login"
      icon={<IconBell size="1em" aria-hidden />}
    >
      {visibleLabel}
    </Button>
  );
}

export const AppHeaderNotificationItem = memo(AppHeaderNotificationItemComponent);
AppHeaderNotificationItem.displayName = 'AppHeaderNotificationItem';
