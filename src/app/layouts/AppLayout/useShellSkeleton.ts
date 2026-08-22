import { useLayoutEffect, useState } from 'react';

import { isShellSkeletonEnabled } from '@/shared/config';
import { useAdapterPending } from '@/shared/lib';

import { waitForShellPaint } from './waitForShellPaint';

/** Safety cap so a hung chrome icon cannot keep the shell skeleton forever. */
export const SHELL_SKELETON_HOLD_MS = 800;

export type ShellReveal = {
  /** Paint-only skeleton on live chrome (`data-shell-skeleton`). */
  skeleton: boolean;
};

/**
 * Element skeleton on live chrome after bootstrap.
 * When `params.preloader.skeleton: false`, always `{ skeleton: false }` —
 * adapter warmup is held by `BootGate` (single GlobalPreloader).
 */
export function useShellReveal(isReady: boolean): ShellReveal {
  const enabled = isShellSkeletonEnabled();
  const adapterPending = useAdapterPending();
  const blocked = !isReady || adapterPending;

  const [skeletonHold, setSkeletonHold] = useState(enabled);

  if (enabled && blocked && !skeletonHold) {
    setSkeletonHold(true);
  }
  if (!enabled && skeletonHold) {
    setSkeletonHold(false);
  }

  useLayoutEffect(() => {
    if (!enabled || blocked) {
      return undefined;
    }

    let cancelled = false;
    let frame = 0;
    let innerFrame = 0;
    const abort = new AbortController();

    const lift = (): void => {
      if (cancelled) {
        return;
      }
      cancelled = true;
      frame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => {
          setSkeletonHold(false);
        });
      });
    };

    const shell = document.querySelector('[data-shell-skeleton]');
    const timeoutId = window.setTimeout(() => {
      abort.abort();
      lift();
    }, SHELL_SKELETON_HOLD_MS);

    void waitForShellPaint(shell, abort.signal).then(() => {
      window.clearTimeout(timeoutId);
      lift();
    });

    return () => {
      cancelled = true;
      abort.abort();
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(innerFrame);
    };
  }, [blocked, enabled]);

  if (!enabled) {
    return { skeleton: false };
  }

  return { skeleton: blocked || skeletonHold };
}

/** @deprecated Prefer `useShellReveal` — returns only the paint-skeleton flag. */
export function useShellSkeleton(isReady: boolean): boolean {
  return useShellReveal(isReady).skeleton;
}
