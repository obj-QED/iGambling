import { describe, expect, it } from 'vitest';

import { DEFAULT_HEADER_CONFIG, resolveHeaderConfig } from '@/widgets/header/config';

describe('resolveHeaderConfig', () => {
  it('returns defaults when settings.header is missing', () => {
    expect(resolveHeaderConfig({})).toEqual(DEFAULT_HEADER_CONFIG);
  });

  it('merges settings.header values from legacy customBlock', () => {
    expect(
      resolveHeaderConfig({
        header: {
          layout: 'container-fluid',
          type: 'custom',
          customBlock: {
            key: 'settings-block',
            placement: 'append',
            items: [{ key: 'timer', url: '/timer', name: 'Timer' }],
          },
        },
      }),
    ).toEqual({
      ...DEFAULT_HEADER_CONFIG,
      layout: 'container-fluid',
      type: 'custom',
      customBlocks: [
        {
          key: 'settings-block',
          placement: 'append',
          items: [{ key: 'timer', url: '/timer', name: 'Timer' }],
        },
      ],
    });
  });

  it('resolves customBlocks array', () => {
    expect(
      resolveHeaderConfig({
        header: {
          type: 'default',
          customBlocks: [
            {
              key: 'header-tools',
              placement: 'append',
              items: [{ key: 'color_scheme', url: '', name: '' }],
            },
            {
              key: 'header-actions',
              placement: 'append',
              items: [{ key: 'search', url: '/search', name: 'Search' }],
            },
          ],
        },
      }).customBlocks,
    ).toEqual([
      {
        key: 'header-tools',
        placement: 'append',
        items: [{ key: 'color_scheme', url: '', name: '' }],
      },
      {
        key: 'header-actions',
        placement: 'append',
        items: [{ key: 'search', url: '/search', name: 'Search' }],
      },
    ]);
  });

  it('prefers customBlocks over legacy customBlock', () => {
    expect(
      resolveHeaderConfig({
        header: {
          customBlock: {
            key: 'legacy',
            placement: 'append',
            items: [{ key: 'ignored', url: '', name: '' }],
          },
          customBlocks: [
            {
              key: 'new',
              placement: 'append',
              items: [{ key: 'color_scheme', url: '', name: '' }],
            },
          ],
        },
      }).customBlocks?.[0]?.key,
    ).toBe('new');
  });

  it('drops invalid custom blocks', () => {
    expect(
      resolveHeaderConfig({
        header: {
          customBlocks: [
            {
              key: '',
              placement: 'append',
              items: [{ key: 'color_scheme', url: '', name: '' }],
            },
            {
              key: 'valid',
              placement: 'append',
              items: [],
            },
          ],
        },
      }).customBlocks,
    ).toBeUndefined();
  });
});
