import { describe, expect, it } from 'vitest';

import { hasSidebarLayoutContent, splitSidebarMenu } from '@/widgets/sidebar/lib/splitSidebarMenu';

describe('splitSidebarMenu', () => {
  it('splits header, main, and footer sections by key', () => {
    const layout = splitSidebarMenu({
      sections: [
        { key: 'header', items: [{ key: 'account', name: 'Account' }] },
        { key: 'left', items: [{ key: 'home', name: 'Home' }] },
        { key: 'footer', items: [{ key: 'logout', name: 'Logout' }] },
      ],
    });

    expect(layout.headerSection?.key).toBe('header');
    expect(layout.mainMenu.sections).toEqual([
      { key: 'left', items: [{ key: 'home', name: 'Home' }] },
    ]);
    expect(layout.footerSection?.key).toBe('footer');
    expect(hasSidebarLayoutContent(layout)).toBe(true);
  });
});
