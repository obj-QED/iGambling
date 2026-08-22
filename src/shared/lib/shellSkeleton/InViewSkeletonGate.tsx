import type { ReactNode } from 'react';

import { useInView } from 'react-intersection-observer';

type InViewSkeletonGateProps = {
  children: ReactNode;
  /** Rendered when the host is outside the viewport (default: nothing). */
  fallback?: ReactNode;
};

const ROOT_MARGIN = '100px';

/**
 * Viewport gate for pulse skeleton chrome.
 * Off-screen → `fallback` (default `null`); near/in view → `children`.
 * Compose under `ShellSkeletonGate` so settings still win.
 */
export function InViewSkeletonGate({ children, fallback = null }: InViewSkeletonGateProps) {
  const { ref, inView } = useInView({
    rootMargin: ROOT_MARGIN,
    triggerOnce: false,
  });

  return (
    <span
      ref={ref}
      data-inview-skeleton-host=""
      style={{
        display: 'block',
        width: 'var(--adapter-fallback-width, 100%)',
        /* 1px sentinel so IntersectionObserver can fire after scroll with rootMargin. */
        height: inView ? 'auto' : 1,
        overflow: inView ? undefined : 'hidden',
      }}
      aria-hidden={inView ? undefined : true}
    >
      {inView ? children : fallback}
    </span>
  );
}

InViewSkeletonGate.displayName = 'InViewSkeletonGate';
