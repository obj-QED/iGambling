import { describe, expect, it } from 'vitest';

import { DEFAULT_BANNER_SCHEMA, resolveBannerSchema } from '@/widgets/banner/config';

describe('resolveBannerSchema', () => {
  it('returns defaults', () => {
    expect(resolveBannerSchema()).toEqual(DEFAULT_BANNER_SCHEMA);
  });

  it('merges global layout/variant/behavior', () => {
    expect(
      resolveBannerSchema({
        global: {
          layout: 'hero',
          variant: 'carousel',
          behavior: {
            sticky: false,
            transparent: false,
            hideOnScroll: false,
            autoplay: true,
          },
        },
      }),
    ).toMatchObject({
      layout: 'hero',
      variant: 'carousel',
      behavior: { autoplay: true },
      version: 1,
    });
  });
});
