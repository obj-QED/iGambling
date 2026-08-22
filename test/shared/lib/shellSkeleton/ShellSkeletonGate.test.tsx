import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ShellSkeletonGate } from '@/shared/lib/shellSkeleton';

const skeletonEnabled = vi.hoisted(() => ({ current: true }));

vi.mock('@/shared/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/config')>();
  return {
    ...actual,
    isShellSkeletonEnabled: () => skeletonEnabled.current,
  };
});

describe('ShellSkeletonGate', () => {
  afterEach(() => {
    skeletonEnabled.current = true;
  });

  it('renders children when skeleton is enabled', () => {
    render(
      <ShellSkeletonGate>
        <span>pulse</span>
      </ShellSkeletonGate>,
    );
    expect(screen.getByText('pulse')).toBeInTheDocument();
  });

  it('renders fallback when skeleton is disabled', () => {
    skeletonEnabled.current = false;
    render(
      <ShellSkeletonGate fallback={<span>quiet</span>}>
        <span>pulse</span>
      </ShellSkeletonGate>,
    );
    expect(screen.getByText('quiet')).toBeInTheDocument();
    expect(screen.queryByText('pulse')).not.toBeInTheDocument();
  });
});
