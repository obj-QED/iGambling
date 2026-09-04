import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAppDrawer, useAppDrawerContext } from '@/shared/ui';

describe('useAppDrawer', () => {
  it('starts closed and toggles open state', () => {
    const { result } = renderHook(() => useAppDrawer());

    expect(result.current.opened).toBe(false);

    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.opened).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.opened).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.opened).toBe(false);
  });

  it('respects initialOpened', () => {
    const { result } = renderHook(() => useAppDrawer(true));
    expect(result.current.opened).toBe(true);
  });
});

describe('useAppDrawerContext', () => {
  it('returns noop fallback outside provider', () => {
    const { result } = renderHook(() => useAppDrawerContext());

    expect(result.current.opened).toBe(false);

    act(() => {
      result.current.open();
      result.current.toggle();
    });

    expect(result.current.opened).toBe(false);
  });
});
