import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getLazyAdapter, preloadAdapters, useAdapter } from '@/shared/lib/widgetAdapter';

describe('useAdapter', () => {
  const adapters = {
    row: async () => ({ default: () => null }),
    icon: async () => ({ default: () => null }),
  };

  it('resolves requested variant', () => {
    const { result } = renderHook(() => useAdapter(adapters, 'icon', ['row', 'icon']));
    expect(result.current).not.toBeNull();
  });

  it('falls back when variant missing', () => {
    const { result } = renderHook(() => useAdapter(adapters, 'unknown', ['row', 'icon']));
    expect(result.current).not.toBeNull();
  });

  it('returns null for empty map', () => {
    const { result } = renderHook(() => useAdapter({}, 'row'));
    expect(result.current).toBeNull();
  });

  it('reuses the same lazy component for the same loader', () => {
    const loader = async () => ({ default: () => null });
    expect(getLazyAdapter(loader)).toBe(getLazyAdapter(loader));
  });

  it('preloadAdapters invokes loader', async () => {
    let called = false;
    const map = {
      row: async () => {
        called = true;
        return { default: () => null };
      },
    };
    preloadAdapters(map, 'row');
    await Promise.resolve();
    expect(called).toBe(true);
  });
});
