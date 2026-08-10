import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';

import { useNavActive } from '@/shared/hooks/useNavActive';
import { setPathname } from '@/shared/lib/routing';

describe('useNavActive', () => {
  it('re-renders only when isActive flips', () => {
    setPathname('/home');

    const { result, rerender } = renderHook(() => useNavActive({ url: '/games' }));
    expect(result.current.isActive).toBe(false);

    act(() => {
      setPathname('/promo');
    });
    rerender();
    expect(result.current.isActive).toBe(false);

    act(() => {
      setPathname('/games');
    });
    expect(result.current.isActive).toBe(true);
    expect(result.current.activeAttrs).toEqual({ 'data-active': 'true' });
  });
});
