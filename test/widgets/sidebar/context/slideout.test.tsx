import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';

import { SidebarSlideoutProvider, useSidebarSlideout } from '@/widgets/sidebar/context/slideout';

function wrapper(enabled: boolean) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <SidebarSlideoutProvider enabled={enabled}>{children}</SidebarSlideoutProvider>;
  };
}

describe('useSidebarSlideout', () => {
  it('stays idle when disabled', () => {
    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(false) });
    expect(result.current.enabled).toBe(false);
    expect(result.current.expanded).toBe(false);
    expect(result.current.settled).toBe(false);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(false);
  });

  it('starts collapsed and settled', () => {
    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(true) });
    expect(result.current.expanded).toBe(false);
    expect(result.current.settled).toBe(true);
  });

  it('clears settled on expand and restores after markSettled when collapsed', () => {
    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(true) });

    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(true);
    expect(result.current.settled).toBe(false);

    act(() => {
      result.current.setExpanded(false);
    });
    expect(result.current.expanded).toBe(false);
    expect(result.current.settled).toBe(false);

    act(() => {
      result.current.markSettled();
    });
    expect(result.current.settled).toBe(true);
  });
});
