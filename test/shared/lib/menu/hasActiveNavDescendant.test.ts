import { describe, expect, it } from 'vitest';

import { hasActiveNavDescendant } from '@/shared/lib/menu/hasActiveNavDescendant';

describe('hasActiveNavDescendant', () => {
  it('returns false for empty / undefined', () => {
    expect(hasActiveNavDescendant(undefined, '/games')).toBe(false);
    expect(hasActiveNavDescendant([], '/games')).toBe(false);
  });

  it('detects a direct active child by URL', () => {
    expect(hasActiveNavDescendant([{ key: 'slots', url: '/games/slots' }], '/games/slots')).toBe(
      true,
    );
    expect(hasActiveNavDescendant([{ key: 'slots', url: '/games/slots' }], '/promo')).toBe(false);
  });

  it('detects nested active descendant', () => {
    expect(
      hasActiveNavDescendant(
        [
          {
            key: 'casino',
            url: '/casino',
            items: [{ key: 'slots', url: '/games/slots' }],
          },
        ],
        '/games/slots',
      ),
    ).toBe(true);
  });

  it('respects explicit active flag on a child', () => {
    expect(hasActiveNavDescendant([{ key: 'x', url: '/other', active: true }], '/home')).toBe(true);
  });
});
