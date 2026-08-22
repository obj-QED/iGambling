import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { mantineTheme } from '@/assets/theme';
import { AdapterBoundary } from '@/shared/lib/widgetAdapter';

const skeletonEnabled = vi.hoisted(() => ({ current: true }));
const inViewState = vi.hoisted(() => ({ current: true }));

vi.mock('@/shared/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/config')>();
  return {
    ...actual,
    isShellSkeletonEnabled: () => skeletonEnabled.current,
  };
});

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: inViewState.current,
  }),
}));

function LazyNever() {
  // eslint-disable-next-line @typescript-eslint/only-throw-error -- Suspense test probe
  throw new Promise(() => undefined);
}

describe('AdapterBoundary', () => {
  afterEach(() => {
    skeletonEnabled.current = true;
    inViewState.current = true;
  });

  it('uses --adapter-fallback-height on the suspense skeleton', () => {
    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AdapterBoundary>
          <LazyNever />
        </AdapterBoundary>
      </MantineProvider>,
    );

    const fallback = document.querySelector('[data-adapter-fallback]');
    expect(fallback).toBeTruthy();
    expect(fallback?.getAttribute('style') ?? '').toContain('--adapter-fallback-height');
    expect(fallback?.className ?? '').toMatch(/Skeleton|skeleton/i);
  });

  it('renders no size slot when params.preloader.skeleton is false', () => {
    skeletonEnabled.current = false;

    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AdapterBoundary>
          <LazyNever />
        </AdapterBoundary>
      </MantineProvider>,
    );

    expect(document.querySelector('[data-adapter-fallback]')).toBeNull();
  });

  it('renders no pulse when the slot is out of view', () => {
    inViewState.current = false;

    render(
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <AdapterBoundary>
          <LazyNever />
        </AdapterBoundary>
      </MantineProvider>,
    );

    expect(document.querySelector('[data-adapter-fallback]')).toBeNull();
    expect(document.querySelector('[data-inview-skeleton-host]')).toBeTruthy();
  });
});
