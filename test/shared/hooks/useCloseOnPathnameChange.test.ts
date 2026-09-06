import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useCloseOnPathnameChange } from '@/shared/hooks/useCloseOnPathnameChange';
import { setPathname } from '@/shared/lib/routing';

describe('useCloseOnPathnameChange', () => {
  it('calls close when pathname changes without re-rendering the host for the string itself', () => {
    setPathname('/a');
    const close = vi.fn();
    let renders = 0;

    renderHook(() => {
      renders += 1;
      useCloseOnPathnameChange(close);
    });

    expect(renders).toBe(1);
    expect(close).not.toHaveBeenCalled();

    act(() => {
      setPathname('/b');
    });

    expect(close).toHaveBeenCalledTimes(1);
    expect(renders).toBe(1);

    act(() => {
      setPathname('/b');
    });
    expect(close).toHaveBeenCalledTimes(1);
  });
});
