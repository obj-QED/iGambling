import { memo } from 'react';

import styles from '../../../styles/base/AppHeaderSkeletonBase.module.scss';

type AppHeaderDefaultContainerSkeletonProps = {
  sectionCount: number;
};

function AppHeaderDefaultContainerSkeletonComponent({ sectionCount }: AppHeaderDefaultContainerSkeletonProps) {
  if (sectionCount === 1) {
    return (
      <div className={`${styles.skeleton} ${styles['skeleton--single']}`}>
        <div className={styles.skeleton__bar} />
      </div>
    );
  }

  return (
    <div className={styles.skeleton}>
      {Array.from({ length: sectionCount }, (_, i) => (
        <div key={i} className={styles.skeleton__segment} />
      ))}
    </div>
  );
}

export const AppHeaderDefaultContainerSkeleton = memo(AppHeaderDefaultContainerSkeletonComponent);
AppHeaderDefaultContainerSkeleton.displayName = 'AppHeaderDefaultContainerSkeleton';
