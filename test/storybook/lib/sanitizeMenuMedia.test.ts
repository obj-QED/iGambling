import { describe, expect, it } from 'vitest';

import {
  resolveStorybookItemUrl,
  resolveStorybookMediaSrc,
  sanitizeStorybookMenu,
  STORYBOOK_TABLER,
} from '@/storybook/lib/sanitizeMenuMedia';

describe('sanitizeMenuMedia', () => {
  it('coerces query-only and relative urls to valid app hrefs', () => {
    expect(resolveStorybookItemUrl('?search=ice')).toBe('/search?search=ice');
    expect(resolveStorybookItemUrl('category/slots')).toBe('/category/slots');
    expect(resolveStorybookItemUrl('/ok')).toBe('/ok');
    expect(resolveStorybookItemUrl('#')).toBe('/');
  });

  it('maps missing media to Tabler icons under public/', () => {
    expect(resolveStorybookMediaSrc('/images/tags/white/keno.webp')).toBe(STORYBOOK_TABLER.star);
    expect(resolveStorybookMediaSrc('')).toBe('');
    expect(resolveStorybookMediaSrc('', 'search')).toBe(STORYBOOK_TABLER.search);
    expect(resolveStorybookMediaSrc('', 'logo')).toMatch(/uploads\/web\.svg$/);
    expect(resolveStorybookMediaSrc('/images/x.webp', 'slots')).toBe(STORYBOOK_TABLER.dice);
  });

  it('preserves explicit logo CDN / uploads (does not force web.svg)', () => {
    expect(resolveStorybookMediaSrc('https://999ggg.net/uploads/logo.png', 'logo')).toBe(
      'https://999ggg.net/uploads/logo.png',
    );
    expect(resolveStorybookMediaSrc('/uploads/logo.png', 'logo')).toMatch(/uploads\/logo\.png$/);
    expect(resolveStorybookMediaSrc('uploads/web.svg', 'logo')).toMatch(/uploads\/web\.svg$/);
  });

  it('sanitizes nested menu urls and imgs', () => {
    const menu = sanitizeStorybookMenu({
      sections: [
        {
          key: 'left',
          items: [
            { key: 'search_leftmenu', name: 'Search', url: '?search=ice', type: 'link' },
            {
              key: 'casino',
              name: 'Casino',
              url: '#',
              type: 'link',
              items: [
                {
                  key: 'slots',
                  name: 'Slots',
                  url: 'category/slots',
                  img: '/images/menu/left/white/slots.svg',
                  type: 'link',
                },
              ],
            },
          ],
        },
      ],
    });

    expect(menu.sections[0]?.items[0]?.url).toBe('/search?search=ice');
    expect(menu.sections[0]?.items[1]?.url).toBe('/');
    expect(menu.sections[0]?.items[1]?.items?.[0]?.url).toBe('/category/slots');
    expect(menu.sections[0]?.items[1]?.items?.[0]?.img).toBe(STORYBOOK_TABLER.dice);
  });
});
