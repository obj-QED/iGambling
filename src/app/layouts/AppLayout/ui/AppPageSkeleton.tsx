import { Skeleton } from '@mantine/core';

import { InViewSkeletonGate, ShellSkeletonGate } from '@/shared/lib';

import styles from './AppLayout.module.scss';

export function AppPageSkeleton() {
  return (
    <ShellSkeletonGate>
      <InViewSkeletonGate>
        <div className={styles.pageSkeleton}>
          <Skeleton className={styles.skelLine} />
          <Skeleton className={`${styles.skelLine} ${styles.skelLineShort}`} />
        </div>
      </InViewSkeletonGate>
    </ShellSkeletonGate>
  );
}

AppPageSkeleton.displayName = 'AppPageSkeleton';
