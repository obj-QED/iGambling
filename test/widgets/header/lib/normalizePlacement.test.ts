import { describe, expect, it } from 'vitest';

import { normalizeCustomBlockPlacement } from '@/widgets/header/lib/normalizePlacement';

describe('normalizeCustomBlockPlacement', () => {
  it('maps legacy append to header end', () => {
    expect(normalizeCustomBlockPlacement('append')).toEqual({
      kind: 'new-section',
      header: 'end',
    });
  });

  it('maps section + at to in-section placement', () => {
    expect(normalizeCustomBlockPlacement({ section: 'block3', at: 'end' })).toEqual({
      kind: 'in-section',
      sectionKey: 'block3',
      at: 'end',
    });
  });

  it('maps numeric at to index', () => {
    expect(normalizeCustomBlockPlacement({ section: 'block3', at: 1 })).toEqual({
      kind: 'in-section',
      sectionKey: 'block3',
      at: 1,
    });
  });
});
