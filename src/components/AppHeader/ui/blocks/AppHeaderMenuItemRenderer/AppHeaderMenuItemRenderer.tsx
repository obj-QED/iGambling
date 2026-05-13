import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';
import type { ComponentType, FC } from 'react';

import { memo } from 'react';

import { MantineColorSchemeToggle } from '@ui';

import { AppHeaderBonusBoxItem } from '@AppHeader/ui/blocks/AppHeaderBonusBoxItem/AppHeaderBonusBoxItem';
import { AppHeaderDefaultMenuItem } from '@AppHeader/ui/blocks/AppHeaderDefaultMenuItem/AppHeaderDefaultMenuItem';
import { AppHeaderLogoItem } from '@AppHeader/ui/blocks/AppHeaderLogoItem/AppHeaderLogoItem';
import { AppHeaderMenuDropdownItem } from '@AppHeader/ui/blocks/AppHeaderMenuDropdownItem/AppHeaderMenuDropdownItem';
import { AppHeaderNotificationItem } from '@AppHeader/ui/blocks/AppHeaderNotificationItem/AppHeaderNotificationItem';
import { AppHeaderSearchItem } from '@AppHeader/ui/blocks/AppHeaderSearchItem/AppHeaderSearchItem';
import { AppHeaderWalletItem } from '@AppHeader/ui/blocks/AppHeaderWalletItem/AppHeaderWalletItem';

type AppHeaderMenuItemRendererProps = {
  item: AppHeaderMenuItem;
};

const AppHeaderThemeMenuItem: FC<AppHeaderMenuItemRendererProps> = () => <MantineColorSchemeToggle />;

AppHeaderThemeMenuItem.displayName = 'AppHeaderThemeMenuItem';

const SPECIAL_COMPONENTS: Partial<
  Record<AppHeaderMenuItem['key'], ComponentType<AppHeaderMenuItemRendererProps>>
> = {
  theme: AppHeaderThemeMenuItem,
  bonus_box: AppHeaderBonusBoxItem,
  logo: AppHeaderLogoItem,
  notification: AppHeaderNotificationItem,
  search: AppHeaderSearchItem,
  wallet: AppHeaderWalletItem,
};

function AppHeaderMenuItemRendererComponent({ item }: AppHeaderMenuItemRendererProps) {
  const Special = SPECIAL_COMPONENTS[item.key];
  if (Special) {
    return <Special item={item} />;
  }

  if (Array.isArray(item.items) && item.items.length > 0) {
    return <AppHeaderMenuDropdownItem item={item} />;
  }

  return <AppHeaderDefaultMenuItem item={item} />;
}

export const AppHeaderMenuItemRenderer = memo(AppHeaderMenuItemRendererComponent);
AppHeaderMenuItemRenderer.displayName = 'AppHeaderMenuItemRenderer';
