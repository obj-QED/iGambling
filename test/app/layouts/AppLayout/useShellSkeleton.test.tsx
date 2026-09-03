import type { ReactNode } from 'react';

import { useState } from 'react';

import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useShellReveal, useShellSkeleton } from '@/app/layouts/AppLayout/useShellSkeleton';
import { AdapterPendingFallback, AdapterPendingProvider } from '@/shared/lib/widgetAdapter';

const skeletonEnabled = vi.hoisted(() => ({ current: true }));

vi.mock('@/shared/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/config')>();
  return {
    ...actual,
    isShellSkeletonEnabled: () => skeletonEnabled.current,
  };
});

describe('useShellReveal', () => {
  afterEach(() => {
    skeletonEnabled.current = true;
  });

  it('keeps element skeleton on while init is not ready', () => {
    const { result } = renderHook(() => useShellReveal(false), {
      wrapper: AdapterPendingProvider,
    });

    expect(result.current.skeleton).toBe(true);
  });

  it('stays on while an adapter fallback is mounted before reveal', () => {
    function wrapper({ children }: { children: ReactNode }) {
      return (
        <AdapterPendingProvider>
          <AdapterPendingFallback>
            <span>fallback</span>
          </AdapterPendingFallback>
          {children}
        </AdapterPendingProvider>
      );
    }

    const { result } = renderHook(() => useShellReveal(true), { wrapper });

    expect(result.current.skeleton).toBe(true);
  });

  it('holds then lifts after init is ready and adapters are idle', async () => {
    const { result } = renderHook(() => useShellReveal(true), {
      wrapper: AdapterPendingProvider,
    });

    expect(result.current.skeleton).toBe(true);

    await waitFor(() => {
      expect(result.current.skeleton).toBe(false);
    });
  });

  it('does not re-arm shell skeleton after reveal when a late adapter mounts', async () => {
    let setLatePending: ((value: boolean) => void) | undefined;

    function wrapper({ children }: { children: ReactNode }) {
      const [latePending, setLate] = useState(false);
      setLatePending = setLate;

      return (
        <AdapterPendingProvider>
          {latePending ? (
            <AdapterPendingFallback>
              <span>drawer adapter</span>
            </AdapterPendingFallback>
          ) : null}
          {children}
        </AdapterPendingProvider>
      );
    }

    const { result } = renderHook(() => useShellReveal(true), { wrapper });

    await waitFor(() => {
      expect(result.current.skeleton).toBe(false);
    });

    act(() => {
      setLatePending?.(true);
    });

    expect(result.current.skeleton).toBe(false);
  });

  it('never paints element skeleton when disabled in settings', () => {
    skeletonEnabled.current = false;

    const { result } = renderHook(() => useShellReveal(true), {
      wrapper: AdapterPendingProvider,
    });

    expect(result.current.skeleton).toBe(false);
  });

  it('useShellSkeleton returns only the paint flag', () => {
    skeletonEnabled.current = false;
    const { result } = renderHook(() => useShellSkeleton(true), {
      wrapper: AdapterPendingProvider,
    });
    expect(result.current).toBe(false);
  });
});
