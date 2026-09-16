import type { ReactNode } from 'react';

import { useLayoutEffect, useState } from 'react';

import { isShellSkeletonEnabled } from '@/shared/config';
import { useAdapterPending } from '@/shared/lib';

import { GlobalPreloader } from './GlobalPreloader';

import styles from './BootGate.module.scss';

/** Cap so a hung lazy adapter cannot keep the fullscreen preloader forever. */
export const BOOT_ADAPTER_HOLD_MS = 800;

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
 * - `skeleton: false` → hold until bootstrap settles, known chrome adapters idle,
 *   and one paint — so search / specials appear with sync menu rows (no pop-in).
 *   After the first release, late adapters (drawer open, etc.) must not re-arm
 *   the fullscreen preloader.
 */
export function BootGate({ bootstrapPending, children }: BootGateProps) {
  const skeletonOn = isShellSkeletonEnabled();
  const adapterPending = useAdapterPending();
  /** First successful non-skeleton reveal — latches so late adapters do not re-hold. */
  const [released, setReleased] = useState(false);
  /** After bootstrap: one paint window so chrome can mount and suspend adapters. */
  const [chromeSettled, setChromeSettled] = useState(false);

  useLayoutEffect(() => {
    if (skeletonOn || bootstrapPending) {
      setChromeSettled(false);
      return undefined;
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setChromeSettled(true);
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [skeletonOn, bootstrapPending]);

  useLayoutEffect(() => {
    if (skeletonOn || bootstrapPending || released || !chromeSettled) {
      return undefined;
    }
    if (adapterPending) {
      const timeoutId = window.setTimeout(() => {
        setReleased(true);
      }, BOOT_ADAPTER_HOLD_MS);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setReleased(true);
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [skeletonOn, bootstrapPending, released, chromeSettled, adapterPending]);

  const postBootstrapHold =
    !skeletonOn && !released && (bootstrapPending || !chromeSettled || adapterPending);
  const showPreloader = skeletonOn ? bootstrapPending : postBootstrapHold;
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
