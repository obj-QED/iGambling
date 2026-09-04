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
 */
export function BootGate({ bootstrapPending, children }: BootGateProps) {
  const skeletonOn = isShellSkeletonEnabled();
  const adapterPending = useAdapterPending();
  const [adapterHold, setAdapterHold] = useState(!skeletonOn);

  useLayoutEffect(() => {
    if (skeletonOn) {
      setAdapterHold(false);
      return undefined;
    }

    if (bootstrapPending || adapterPending) {
      setAdapterHold(true);
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      setAdapterHold(false);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [skeletonOn, bootstrapPending, adapterPending]);

  const showPreloader = bootstrapPending || (!skeletonOn && adapterHold);
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
