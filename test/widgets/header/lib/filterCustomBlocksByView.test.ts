import { describe, expect, it } from 'vitest';

import type { HeaderCustomBlockConfig } from '@/shared/config';

import { filterCustomBlocksByView } from '@/widgets/header/lib/filterCustomBlocksByView';

const blocks: HeaderCustomBlockConfig[] = [
  { key: 'always', placement: { section: 'block1', at: 'start' }, items: [] },
  {
    key: 'mobile-only',
    placement: { section: 'block1', at: 'start' },
    items: [],
    view: 'mobile',
  },
  {
    key: 'desktop-only',
    placement: { section: 'block1', at: 'start' },
    items: [],
    view: 'desktop',
  },
];

describe('filterCustomBlocksByView', () => {
  it('keeps mobile blocks only on mobile', () => {
    const filtered = filterCustomBlocksByView(blocks, true);
    expect(filtered?.map((b) => b.key)).toEqual(['always', 'mobile-only']);
  });

  it('keeps desktop blocks only on desktop', () => {
    const filtered = filterCustomBlocksByView(blocks, false);
    expect(filtered?.map((b) => b.key)).toEqual(['always', 'desktop-only']);
  });
});
