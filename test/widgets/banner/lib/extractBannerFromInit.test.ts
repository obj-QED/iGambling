import { describe, expect, it } from 'vitest';

import { extractBannerFromInit } from '@/widgets/banner/lib/extractBannerFromInit';

describe('extractBannerFromInit', () => {
  it('reads slides from page.slider', () => {
    const banner = extractBannerFromInit({
      page: {
        slider: [{ background: 'bg.webp', url: '/bonuses' }],
      },
    });

    expect(banner?.slides).toHaveLength(1);
    expect(banner?.slides[0]?.url).toBe('/bonuses');
  });
});
