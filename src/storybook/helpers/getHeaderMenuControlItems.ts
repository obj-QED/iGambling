import { createStorybookHeaderMenuFixture, findHeaderMenuItem } from '@/storybook/data';

export function getHeaderMenuControlItems() {
  const menu = createStorybookHeaderMenuFixture();

  return {
    menu,
    profileItem: findHeaderMenuItem(menu, 'profile'),
    walletItem: findHeaderMenuItem(menu, 'wallet'),
    searchItem: findHeaderMenuItem(menu, 'search'),
    notificationItem: findHeaderMenuItem(menu, 'notification'),
  };
}
