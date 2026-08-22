import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useMediaState } from '@/shared/hooks/useMediaState';

describe('useMediaState', () => {
  it('marks img failed only for the src that errored', () => {
    const { result, rerender } = renderHook(
      (item: { img?: string; name?: string }) => useMediaState(item),
      { initialProps: { img: '/a.webp', name: 'Fish' } },
    );

    expect(result.current.showItemImg).toBe(true);

    act(() => {
      result.current.onImgError();
    });

    expect(result.current.imgFailed).toBe(true);
    expect(result.current.showItemImg).toBe(false);

    rerender({ img: '/b.webp', name: 'Fish' });
    expect(result.current.imgFailed).toBe(false);
    expect(result.current.showItemImg).toBe(true);
  });
});
