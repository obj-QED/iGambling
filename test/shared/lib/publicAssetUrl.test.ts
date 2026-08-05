import { describe, expect, it } from 'vitest';

import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

describe('publicAssetUrl', () => {
  const base = import.meta.env.BASE_URL || '/';
  const expectedBase = base.endsWith('/') ? base : `${base}/`;
  const appUrl = String(import.meta.env.VITE_APP_URL ?? '')
    .trim()
    .replace(/\/+$/, '');

  it('keeps icons on Vite BASE_URL (same-origin for inline SVG)', () => {
    expect(publicAssetUrl('icons/tabler/search.svg')).toBe(
      `${expectedBase}icons/tabler/search.svg`,
    );
    expect(publicAssetUrl('/icons/tabler/home.svg')).toBe(`${expectedBase}icons/tabler/home.svg`);
  });

  it('keeps local demo SVGs under uploads/ on BASE_URL', () => {
    expect(publicAssetUrl('uploads/web.svg')).toBe(`${expectedBase}uploads/web.svg`);
  });

  it('prefixes raster uploads/images with VITE_APP_URL when set', () => {
    if (appUrl.length === 0) {
      expect(publicAssetUrl('/uploads/logo.png')).toBe(`${expectedBase}uploads/logo.png`);
      expect(publicAssetUrl('images/menu/left/white/slots.svg')).toBe(
        `${expectedBase}images/menu/left/white/slots.svg`,
      );
      return;
    }

    expect(publicAssetUrl('/uploads/logo.png')).toBe(`${appUrl}/uploads/logo.png`);
    expect(publicAssetUrl('uploads/jlogo.webp')).toBe(`${appUrl}/uploads/jlogo.webp`);
    // SVG under images/ stays same-origin (inline SVG CORS)
    expect(publicAssetUrl('images/menu/left/white/slots.svg')).toBe(
      `${expectedBase}images/menu/left/white/slots.svg`,
    );
  });

  it('passes through absolute urls', () => {
    expect(publicAssetUrl('https://cdn.example/a.png')).toBe('https://cdn.example/a.png');
  });
});
