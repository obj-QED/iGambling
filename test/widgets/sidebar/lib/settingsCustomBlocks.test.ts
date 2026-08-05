import { describe, expect, it } from 'vitest';

import { mergeCustomBlocks } from '@/widgets/header/lib/mergeBlocks';
import { filterRenderableMenu, splitSidebarMenu } from '@/widgets/sidebar/lib';
import { SIDEBAR_MENU_MOCK } from '@/widgets/sidebar/mocks/sidebarMenu.mock';

describe('sidebar settings customBlocks → layout', () => {
  it('injects account into header from customBlocks when menu has no header', () => {
    const menuWithoutHeader = {
      ...SIDEBAR_MENU_MOCK,
      sections: SIDEBAR_MENU_MOCK.sections.filter((section) => section.key !== 'header'),
    };
    expect(menuWithoutHeader.sections.some((section) => section.key === 'header')).toBe(false);

    const merged = filterRenderableMenu(
      mergeCustomBlocks(menuWithoutHeader, [
        {
          key: 'header',
          placement: { header: 'start' },
          items: [
            {
              url: '/profile',
              name: 'Harriette Spoonlicker',
              key: 'account',
              img: '/images/misc/default/header/icon_user.webp',
              imgRadius: 'round',
              subtitle: 'hspoonlicker@outlook.com',
              type: 'link',
            },
          ],
        },
        {
          key: 'footer',
          placement: { section: 'footer', at: 'start' },
          items: [
            {
              url: '/logout',
              name: 'Logout',
              key: 'logout',
              type: 'button',
            },
          ],
        },
      ]),
    );

    const layout = splitSidebarMenu(merged);

    expect(layout.headerSection?.key).toBe('header');
    expect(layout.headerSection?.items.map((item) => item.key)).toContain('account');
    expect(layout.footerSection?.key).toBe('footer');
    expect(layout.footerSection?.items.map((item) => item.key)).toContain('logout');
    expect(layout.mainMenu.sections.length).toBeGreaterThan(0);
  });
});
