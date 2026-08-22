import type { ReactNode } from 'react';

import { isShellSkeletonEnabled } from '@/shared/config';

type ShellSkeletonGateProps = {
  children: ReactNode;
  /** Rendered when `params.preloader.skeleton: false` (default: nothing). Prefer `null`. */
  fallback?: ReactNode;
};

/**
 * Global gate for visible skeleton UI (pulse / gray bars).
 * SoT: `params.preloader.skeleton` via `isShellSkeletonEnabled()`.
 * When false → never paint skeleton chrome (default `fallback={null}`).
 */
export function ShellSkeletonGate({ children, fallback = null }: ShellSkeletonGateProps) {
  if (!isShellSkeletonEnabled()) {
    return fallback;
  }
  return children;
}
