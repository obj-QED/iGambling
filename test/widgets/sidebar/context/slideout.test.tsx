import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';

import { SidebarSlideoutProvider, useSidebarSlideout } from '@/widgets/sidebar/context/slideout';
import {
  readSidebarSlideoutExpanded,
  resolveSidebarSlideoutPhase,
  writeSidebarSlideoutExpanded,
} from '@/widgets/sidebar/lib/slideout';

const STORAGE_KEY = 'igambling:sidebar:slideout-expanded';

vi.mock('@hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}));

import { useIsMobile } from '@hooks/useIsMobile';

function wrapper(enabled: boolean) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <SidebarSlideoutProvider enabled={enabled}>{children}</SidebarSlideoutProvider>;
  };
}

describe('resolveSidebarSlideoutPhase', () => {
  it('maps expanded/settled to the four phases', () => {
    expect(resolveSidebarSlideoutPhase(true, true)).toBe('expanded');
    expect(resolveSidebarSlideoutPhase(true, false)).toBe('expanding');
    expect(resolveSidebarSlideoutPhase(false, true)).toBe('collapsed');
    expect(resolveSidebarSlideoutPhase(false, false)).toBe('collapsing');
  });
});

describe('useSidebarSlideout', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(useIsMobile).mockReturnValue(false);
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('stays idle when disabled', () => {
    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(false) });
    expect(result.current.enabled).toBe(false);
    expect(result.current.expanded).toBe(false);
    expect(result.current.phase).toBe('expanded');
    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(false);
  });

  it('starts expanded idle and persists toggles through phases', () => {
    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(true) });
    expect(result.current.expanded).toBe(true);
    expect(result.current.settled).toBe(true);
    expect(result.current.phase).toBe('expanded');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(false);
    expect(result.current.settled).toBe(false);
    expect(result.current.phase).toBe('collapsing');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('false');

    act(() => {
      result.current.markSettled();
    });
    expect(result.current.settled).toBe(true);
    expect(result.current.phase).toBe('collapsed');

    act(() => {
      result.current.toggle();
    });
    expect(result.current.phase).toBe('expanding');

    act(() => {
      result.current.markSettled();
    });
    expect(result.current.phase).toBe('expanded');
  });

  it('restores collapsed idle from localStorage', () => {
    writeSidebarSlideoutExpanded(false);
    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(true) });
    expect(result.current.expanded).toBe(false);
    expect(result.current.settled).toBe(true);
    expect(result.current.phase).toBe('collapsed');
  });

  it('disables rail below tablet and forces expanded', () => {
    writeSidebarSlideoutExpanded(false);
    vi.mocked(useIsMobile).mockReturnValue(true);

    const { result } = renderHook(() => useSidebarSlideout(), { wrapper: wrapper(true) });
    expect(result.current.enabled).toBe(false);
    expect(result.current.expanded).toBe(true);
    expect(result.current.phase).toBe('expanded');

    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(true);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('false');
  });
});

describe('sidebarSlideoutStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to open when missing', () => {
    expect(readSidebarSlideoutExpanded()).toBe(true);
  });

  it('round-trips boolean', () => {
    writeSidebarSlideoutExpanded(false);
    expect(readSidebarSlideoutExpanded()).toBe(false);
    writeSidebarSlideoutExpanded(true);
    expect(readSidebarSlideoutExpanded()).toBe(true);
  });
});
