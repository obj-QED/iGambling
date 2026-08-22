import { describe, expect, it } from 'vitest';

import { isBrokenHtmlImage } from '@/shared/lib/cmfIcon/imageLoad';

describe('isBrokenHtmlImage', () => {
  it('is true for a complete image with no intrinsic width', () => {
    expect(
      isBrokenHtmlImage({
        src: 'http://localhost/images/tags/white/fish.webp',
        complete: true,
        naturalWidth: 0,
      }),
    ).toBe(true);
  });

  it('is false while the image is still loading', () => {
    expect(
      isBrokenHtmlImage({
        src: 'http://localhost/images/tags/white/fish.webp',
        complete: false,
        naturalWidth: 0,
      }),
    ).toBe(false);
  });

  it('is false for a decoded image', () => {
    expect(
      isBrokenHtmlImage({
        src: 'http://localhost/images/tags/white/fish.webp',
        complete: true,
        naturalWidth: 25,
      }),
    ).toBe(false);
  });

  it('is false when src is empty', () => {
    expect(isBrokenHtmlImage({ src: '', complete: true, naturalWidth: 0 })).toBe(false);
  });
});
