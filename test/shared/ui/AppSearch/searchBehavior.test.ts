import { describe, expect, it } from 'vitest';

import {
  isSearchInputBehavior,
  isSearchOverlayBehavior,
  isSpotlightSearchBehavior,
} from '@/shared/config';
import { shouldShowSearchResults } from '@/shared/ui';

describe('search behavior helpers', () => {
  it('classifies overlay / input / spotlight', () => {
    expect(isSearchOverlayBehavior('modal')).toBe(true);
    expect(isSearchOverlayBehavior('spotlight')).toBe(true);
    expect(isSearchOverlayBehavior('input')).toBe(false);
    expect(isSearchInputBehavior('input')).toBe(true);
    expect(isSpotlightSearchBehavior('spotlight')).toBe(true);
  });

  it('swaps page only when query is non-empty in input mode', () => {
    expect(
      shouldShowSearchResults({ query: 'slots', pageMode: 'input', globalType: 'modal' }),
    ).toBe(true);
    expect(shouldShowSearchResults({ query: '  ', pageMode: 'input', globalType: 'input' })).toBe(
      false,
    );
    expect(shouldShowSearchResults({ query: 'slots', pageMode: 'idle', globalType: 'input' })).toBe(
      true,
    );
    expect(shouldShowSearchResults({ query: 'slots', pageMode: 'idle', globalType: 'modal' })).toBe(
      false,
    );
  });
});
