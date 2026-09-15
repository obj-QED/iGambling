import { describe, expect, it } from 'vitest';

import { SEARCH_TYPE_LOADERS } from '@/shared/ui/AppSearch/type';

describe('SEARCH_TYPE_LOADERS', () => {
  it('exposes lazy loaders for each search type', () => {
    expect(Object.keys(SEARCH_TYPE_LOADERS).sort()).toEqual(['input', 'modal', 'spotlight']);
    for (const loader of Object.values(SEARCH_TYPE_LOADERS)) {
      expect(typeof loader).toBe('function');
    }
  });
});
