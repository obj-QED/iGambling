import { describe, expect, it } from 'vitest';

import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

describe('publicAssetUrl', () => {
  it('prefixes Vite BASE_URL and strips leading slashes', () => {
    const base = import.meta.env.BASE_URL || '/';
    const expectedBase = base.endsWith('/') ? base : `${base}/`;
    expect(publicAssetUrl('/uploads/jlogo.webp')).toBe(`${expectedBase}uploads/jlogo.webp`);
    expect(publicAssetUrl('icons/tabler/search.svg')).toBe(
      `${expectedBase}icons/tabler/search.svg`,
    );
  });
});
