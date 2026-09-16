import type { ComponentType, ReactNode } from 'react';

import { memo, Suspense } from 'react';

import { Skeleton } from '@mantine/core';

import { isShellSkeletonEnabled } from '@/shared/config';
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
  // `skeleton: false` → null. Viewport deferral lives in AdapterBoundary.
  return (
    <ShellSkeletonGate fallback={null}>
      <PulseFallback />
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
  const boundary = (
    <Suspense fallback={<AdapterPendingFallback>{resolvedFallback}</AdapterPendingFallback>}>
      {children}
    </Suspense>
  );

  // Global skeleton off must never leave reserved, empty slots. In that mode
  // BootGate keeps the single startup preloader and adapters mount normally.
  if (!isShellSkeletonEnabled()) {
    return boundary;
  }

  return (
    <InViewSkeletonGate fallback={null} preserveSpace>
      {boundary}
    </InViewSkeletonGate>
  );
}

export const AdapterBoundary = memo(AdapterBoundaryComponent);
AdapterBoundary.displayName = 'AdapterBoundary';

/**
 * Module-level host for components resolved in render (`useAdapter`, `useWrapper`,
 * layout registries). Callers pass `component={Adapter}` instead of `<Adapter />`.
 */
export function LazyHost<P extends object>({
  component: Component,
  ...props
}: { component: ComponentType<P> } & P) {
  return <Component {...(props as P)} />;
}
