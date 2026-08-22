import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { InViewSkeletonGate } from '@/shared/lib/shellSkeleton';

const inViewState = vi.hoisted(() => ({ current: true }));

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: inViewState.current,
  }),
}));

describe('InViewSkeletonGate', () => {
  afterEach(() => {
    inViewState.current = true;
  });

  it('renders children when in view', () => {
    inViewState.current = true;
    render(
      <InViewSkeletonGate>
        <span>pulse</span>
      </InViewSkeletonGate>,
    );
    expect(screen.getByText('pulse')).toBeInTheDocument();
    expect(document.querySelector('[data-inview-skeleton-host]')).toBeTruthy();
  });

  it('renders fallback when out of view', () => {
    inViewState.current = false;
    render(
      <InViewSkeletonGate fallback={<span>quiet</span>}>
        <span>pulse</span>
      </InViewSkeletonGate>,
    );
    expect(screen.getByText('quiet')).toBeInTheDocument();
    expect(screen.queryByText('pulse')).not.toBeInTheDocument();
  });

  it('renders nothing when out of view and fallback is omitted', () => {
    inViewState.current = false;
    render(
      <InViewSkeletonGate>
        <span>pulse</span>
      </InViewSkeletonGate>,
    );
    expect(screen.queryByText('pulse')).not.toBeInTheDocument();
    expect(document.querySelector('[data-inview-skeleton-host]')).toBeTruthy();
  });
});
