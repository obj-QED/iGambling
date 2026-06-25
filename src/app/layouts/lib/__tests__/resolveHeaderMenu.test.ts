import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resolveHeaderMenu } from '@/app/layouts/lib/resolveHeaderMenu';

import { getHeaderMenuMock } from '@/widgets/header/mocks';

describe('getHeaderMenuMock', () => {
  beforeEach(() => {
    window.__SETTINGS__ = { header: { mockMenu: true } };
  });

  afterEach(() => {
    window.__SETTINGS__ = undefined;
  });

  it('returns menu when header.mockMenu is enabled', () => {
    const menu = getHeaderMenuMock();

    expect(menu?.sections).toHaveLength(2);
    expect(menu?.sections[0]?.key).toBe('block3');
    expect(menu?.sections[0]?.items.some((item) => item.key === 'logo')).toBe(true);
    expect(menu?.sections[1]?.items.some((item) => item.key === 'wallet')).toBe(true);
  });

  it('returns null when mockMenu is disabled', () => {
    window.__SETTINGS__ = { header: { mockMenu: false } };
    expect(getHeaderMenuMock()).toBeNull();
  });
});

describe('resolveHeaderMenu', () => {
  beforeEach(() => {
    window.__SETTINGS__ = { header: { mockMenu: true } };
  });

  afterEach(() => {
    window.__SETTINGS__ = undefined;
  });

  it('prefers mock over init content when mockMenu is enabled', () => {
    const menu = resolveHeaderMenu({
      page: {
        blocks: [
          {
            type: 'menuHeaderTop',
            menu: [{ key: 'api-only', name: 'API', url: '/api' }],
          },
        ],
      },
    });

    expect(menu?.sections[0]?.items.some((item) => item.key === 'logo')).toBe(true);
    expect(menu?.sections[0]?.items.some((item) => item.key === 'api-only')).toBe(false);
  });

  it('falls back to init when mockMenu is disabled', () => {
    window.__SETTINGS__ = { header: { mockMenu: false } };

    const menu = resolveHeaderMenu({
      page: {
        blocks: [
          {
            type: 'menuHeaderTop',
            menu: [
              {
                key: 'block3',
                name: '',
                url: '',
                items: [{ key: 'api-only', name: 'API', url: '/api' }],
              },
            ],
          },
        ],
      },
    });

    expect(menu?.sections[0]?.items[0]?.key).toBe('api-only');
  });
});
