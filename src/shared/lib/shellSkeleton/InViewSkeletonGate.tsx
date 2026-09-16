import type { ReactNode } from 'react';

import { useInView } from 'react-intersection-observer';

type InViewSkeletonGateProps = {
  children: ReactNode;
  /** Rendered when the host is outside the viewport (default: nothing). */
  fallback?: ReactNode;
  /** Keep the slot geometry while deferring a lazy adapter below the viewport. */
  preserveSpace?: boolean;
};

const ROOT_MARGIN = '240px';

/**
 * Viewport gate for lazy UI and pulse skeleton chrome.
 * Off-screen → `fallback` (default `null`); near/in view → `children`.
 * `preserveSpace` uses adapter size tokens so later mounting cannot move layout.
 * Compose under `ShellSkeletonGate` so settings still win.
 */
export function InViewSkeletonGate({
  children,
  fallback = null,
  preserveSpace = false,
}: InViewSkeletonGateProps) {
  const { ref, inView } = useInView({
    rootMargin: ROOT_MARGIN,
    // Lazy adapters must stay mounted after their first intersection; otherwise
    // scrolling away would tear down local query state and refetch on return.
    triggerOnce: preserveSpace,
  });

  return (
    <span
      ref={ref}
      data-inview-skeleton-host=""
      style={{
        // Once mounted, do not introduce a wrapper into flex/grid adapter layouts.
        display: inView && preserveSpace ? 'contents' : 'block',
        width: 'var(--adapter-fallback-width, 100%)',
        /* 1px sentinel lets IntersectionObserver fire after scroll with rootMargin. */
        height: inView
          ? 'auto'
          : preserveSpace
            ? 'var(--adapter-fallback-height, var(--button-height, 2.625rem))'
            : 1,
        overflow: inView ? undefined : 'hidden',
      }}
      aria-hidden={inView ? undefined : true}
    >
      {inView ? children : fallback}
    </span>
  );
}

InViewSkeletonGate.displayName = 'InViewSkeletonGate';
