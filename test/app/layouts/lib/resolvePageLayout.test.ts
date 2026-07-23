import { describe, expect, it } from 'vitest';

import {
  INFO_PAGE_LAYOUT_HANDLE,
  resolvePageLayoutFromMatches,
} from '@/app/layouts/lib/resolvePageLayout';

describe('resolvePageLayoutFromMatches', () => {
  it('returns default when no handle is present', () => {
    expect(resolvePageLayoutFromMatches([{ handle: {} }])).toBe('default');
  });

  it('returns innermost matching route handle', () => {
    expect(
      resolvePageLayoutFromMatches([
        { handle: { pageLayout: 'default' } },
        { handle: INFO_PAGE_LAYOUT_HANDLE },
      ]),
    ).toBe('info');
  });

  it('falls back to default for unknown layout kind', () => {
    expect(resolvePageLayoutFromMatches([{ handle: { pageLayout: 'unknown' as 'default' } }])).toBe(
      'default',
    );
  });
});
