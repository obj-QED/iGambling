import { describe, expect, it } from 'vitest';

import { extractMenuFromInit } from '@/app/layouts/lib/extractPageMenuFromInit';

describe('extractMenuFromInit', () => {
  it('extracts footer menu as sections', () => {
    const menu = extractMenuFromInit(
      {
        page: {
          menu: [
            {
              key: 'footer',
              items: [
                {
                  key: 'information',
                  items: [{ key: 'faq', url: '/faq', name: 'faq' }],
                },
              ],
            },
          ],
        },
      },
      'footer',
      'sections',
    );

    expect(menu?.sections[0]?.key).toBe('information');
    expect(menu?.sections[0]?.items[0]?.key).toBe('faq');
  });

  it('extracts left menu as a single flat section', () => {
    const menu = extractMenuFromInit(
      {
        page: {
          menu: [
            {
              key: 'left',
              items: [
                { key: 'home', url: '/', name: 'home' },
                { key: 'jackpots', url: '/jackpots', name: 'jackpots' },
              ],
            },
          ],
        },
      },
      'left',
      'flat',
    );

    expect(menu?.sections).toHaveLength(1);
    expect(menu?.sections[0]?.key).toBe('left');
    expect(menu?.sections[0]?.items).toHaveLength(2);
  });
});
