import { describe, expect, it } from 'vitest';

import { shouldRenderCmfActiveLine } from '@/shared/ui/CmfActiveLine';

describe('shouldRenderCmfActiveLine', () => {
  it('requires activeType line and data-active', () => {
    expect(shouldRenderCmfActiveLine({ 'data-active': 'true', activeType: 'line' })).toBe(true);
    expect(shouldRenderCmfActiveLine({ 'data-active': true, activeType: 'line' })).toBe(true);
    expect(shouldRenderCmfActiveLine({ 'data-active': 'true' })).toBe(false);
    expect(shouldRenderCmfActiveLine({ 'data-active': 'true', activeType: 'element' })).toBe(false);
    expect(shouldRenderCmfActiveLine({ activeType: 'line' })).toBe(false);
    expect(shouldRenderCmfActiveLine({ 'data-active': 'false', activeType: 'line' })).toBe(false);
  });

  it('skips button-link and disabled states', () => {
    expect(
      shouldRenderCmfActiveLine({
        'data-active': 'true',
        activeType: 'line',
        'data-variant': 'button-link',
      }),
    ).toBe(false);
    expect(
      shouldRenderCmfActiveLine({ 'data-active': 'true', activeType: 'line', disabled: true }),
    ).toBe(false);
    expect(
      shouldRenderCmfActiveLine({
        'data-active': 'true',
        activeType: 'line',
        'data-disabled': 'true',
      }),
    ).toBe(false);
    expect(
      shouldRenderCmfActiveLine({
        'data-active': 'true',
        activeType: 'line',
        'aria-disabled': true,
      }),
    ).toBe(false);
  });
});
