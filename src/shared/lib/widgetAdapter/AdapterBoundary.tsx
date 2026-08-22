import type { ReactNode } from 'react';

import { memo, Suspense } from 'react';

import { Skeleton } from '@mantine/core';

import { InViewSkeletonGate, ShellSkeletonGate } from '@/shared/lib/shellSkeleton';

import { AdapterPendingFallback } from './adapterPending';

type AdapterBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

const FALLBACK_BOX_STYLE = {
  display: 'block',
  height: 'var(--adapter-fallback-height, var(--button-height, 2.625rem))',
  width: 'var(--adapter-fallback-width, 100%)',
} as const;

function PulseFallback() {
  return (
    <Skeleton
      data-adapter-fallback=""
      height={FALLBACK_BOX_STYLE.height}
      width={FALLBACK_BOX_STYLE.width}
      radius="sm"
    />
  );
}

function DefaultFallback() {
  // `skeleton: false` → null; off-screen → null; in-view pulse only.
  return (
    <ShellSkeletonGate fallback={null}>
      <InViewSkeletonGate fallback={null}>
        <PulseFallback />
      </InViewSkeletonGate>
    </ShellSkeletonGate>
  );
}

/**
 * Suspense boundary for lazy adapters.
 * Size via ancestor `--adapter-fallback-height` / `--adapter-fallback-width`.
 * Visible pulse only when skeleton is on and the slot is in/near the viewport.
 */
function AdapterBoundaryComponent({ children, fallback }: AdapterBoundaryProps) {
  const resolvedFallback = fallback ?? <DefaultFallback />;

  return (
    <Suspense fallback={<AdapterPendingFallback>{resolvedFallback}</AdapterPendingFallback>}>
      {children}
    </Suspense>
  );
}

export const AdapterBoundary = memo(AdapterBoundaryComponent);
AdapterBoundary.displayName = 'AdapterBoundary';
