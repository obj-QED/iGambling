import { describe, expect, it } from 'vitest';

import { resolveAppButtonHrefState } from '@/shared/lib/href/resolveAppButtonHrefState';

describe('resolveAppButtonHrefState', () => {
  it('returns href when url is valid and native is false', () => {
    expect(resolveAppButtonHrefState('/home', false)).toEqual({
      href: '/home',
      disabledForHref: false,
    });
  });

  it('disables when href is an empty string', () => {
    expect(resolveAppButtonHrefState('', false)).toEqual({
      href: undefined,
      disabledForHref: true,
    });
  });

  it('does not disable when href is omitted (toggle / plain button)', () => {
    expect(resolveAppButtonHrefState(undefined, false)).toEqual({
      href: undefined,
      disabledForHref: false,
    });
  });

  it('disables when href is invalid', () => {
    expect(resolveAppButtonHrefState('rel', false)).toEqual({
      href: undefined,
      disabledForHref: true,
    });
    expect(resolveAppButtonHrefState('#', false)).toEqual({
      href: undefined,
      disabledForHref: true,
    });
  });

  it('ignores invalid parent url when native is true (dropdown trigger)', () => {
    expect(resolveAppButtonHrefState('#', true)).toEqual({
      href: undefined,
      disabledForHref: false,
    });
    expect(resolveAppButtonHrefState('/home', true)).toEqual({
      href: undefined,
      disabledForHref: false,
    });
    expect(resolveAppButtonHrefState('rel', true)).toEqual({
      href: undefined,
      disabledForHref: false,
    });
  });
});
