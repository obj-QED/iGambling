import type { ReactNode } from 'react';

import { useLayoutEffect, useState } from 'react';

import { isShellSkeletonEnabled } from '@/shared/config';
import { useAdapterPending } from '@/shared/lib';

import { GlobalPreloader } from './GlobalPreloader';

import styles from './BootGate.module.scss';

type BootGateProps = {
  bootstrapPending: boolean;
  children: ReactNode;
};

/**
 * Single fullscreen preloader for:
 * 1) translation → init bootstrap
 * 2) when `params.preloader.skeleton: false`, adapter warmup (no second mount)
 *
 * Adapter hold is derived from pending flags; one `requestAnimationFrame` after
 * idle releases the hold (no synchronous setState in the effect body).
 */
export function BootGate({ bootstrapPending, children }: BootGateProps) {
  const skeletonOn = isShellSkeletonEnabled();
  const adapterPending = useAdapterPending();
  const busy = bootstrapPending || adapterPending;
  /** Bumped after a paint when idle (skeleton off) — gates post-warmup release. */
  const [releaseGen, setReleaseGen] = useState(0);

  useLayoutEffect(() => {
    if (skeletonOn || busy) {
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      setReleaseGen((gen) => gen + 1);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [skeletonOn, busy]);

  const adapterHold = !skeletonOn && (busy || releaseGen === 0);
  const showPreloader = bootstrapPending || adapterHold;
  const warmup = !skeletonOn && adapterHold && !bootstrapPending;

  return (
    <>
      {showPreloader && <GlobalPreloader />}
      {!bootstrapPending &&
        (warmup ? (
          <div className={styles.warmup} aria-hidden>
            {children}
          </div>
        ) : (
          children
        ))}
    </>
  );
}

BootGate.displayName = 'BootGate';
