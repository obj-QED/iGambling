import { describe, expect, it } from 'vitest';

import {
  buildSpotlightPageActions,
  SPOTLIGHT_FEATURED_PAGES,
} from '@/shared/ui/AppSearch/lib/buildSpotlightPageActions';

describe('buildSpotlightPageActions', () => {
  const navigate = () => undefined;

  it('empty query returns only featured pages that exist', () => {
    const known = new Set(['/', '/profile', '/faq']);
    const labels = new Map([
      ['/', 'Home'],
      ['/profile', 'My profile'],
      ['/faq', 'FAQ'],
    ]);

    const actions = buildSpotlightPageActions({ query: '', navigate, knownPaths: known, labels });

    expect(actions.map((action) => action.description)).toEqual(['/', '/profile']);
    expect(actions[1]?.label).toBe('My profile');
    expect(actions).toHaveLength(
      SPOTLIGHT_FEATURED_PAGES.filter((entry) => known.has(entry.path)).length,
    );
  });

  it('non-empty query returns all known paths with featured first', () => {
    const known = new Set(['/', '/faq', '/profile']);
    const actions = buildSpotlightPageActions({
      query: 'a',
      navigate,
      knownPaths: known,
      labels: new Map(),
    });

    expect(actions.map((action) => action.description)).toEqual(['/', '/profile', '/faq']);
  });
});
