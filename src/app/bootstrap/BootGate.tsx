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
 * Single fullscreen preloader + early shell mount.
 *
 * Always mounts `children` so layout/chrome can paint under the overlay while
 * translation → init runs (and adapters warm up).
 *
 * - `params.preloader.skeleton: true` → preloader only while bootstrap pending;
 *   element skeleton on chrome continues until API + paint (see `useShellReveal`).
 * - `skeleton: false` → hold preloader until bootstrap + adapters idle + one paint
 *   frame (invisible warmup mount — no second GlobalPreloader).
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
  const showPreloader = skeletonOn ? bootstrapPending : bootstrapPending || adapterHold;
  const warmup = !skeletonOn && showPreloader;

  return (
    <>
      {showPreloader && <GlobalPreloader />}
      {warmup ? (
        <div className={styles.warmup} aria-hidden>
          {children}
        </div>
      ) : (
        children
      )}
    </>
  );
}

BootGate.displayName = 'BootGate';
