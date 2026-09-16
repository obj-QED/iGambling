import { describe, expect, it } from 'vitest';

import { resolveOutletLayout } from '@/shared/config/outletSettings';

describe('resolveOutletLayout', () => {
  it('defaults to container when outlet is omitted', () => {
    expect(resolveOutletLayout({})).toBe('container');
    expect(resolveOutletLayout({ params: {} })).toBe('container');
  });

  it('accepts container-fluid', () => {
    expect(resolveOutletLayout({ params: { outlet: { layout: 'container-fluid' } } })).toBe(
      'container-fluid',
    );
  });

  it('falls back to container for unknown values', () => {
    expect(resolveOutletLayout({ params: { outlet: { layout: 'wide' } } })).toBe('container');
  });
});
