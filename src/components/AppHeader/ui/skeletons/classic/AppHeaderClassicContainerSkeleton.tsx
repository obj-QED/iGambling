import { memo } from 'react';

import styles from '../../../styles/base/AppHeaderSkeletonBase.module.scss';

type AppHeaderClassicContainerSkeletonProps = {
  sectionCount: number;
};

function AppHeaderClassicContainerSkeletonComponent({ sectionCount }: AppHeaderClassicContainerSkeletonProps) {
  if (sectionCount === 1) {
    return (
      <div className={`${styles.skeleton} ${styles['skeleton--single']} ${styles['skeleton--classic']}`}>
        <div className={styles.skeleton__bar} />
      </div>
    );
  }

  return (
    <div className={`${styles.skeleton} ${styles['skeleton--classic']}`}>
      {Array.from({ length: sectionCount }, (_, i) => (
        <div key={i} className={styles.skeleton__segment} />
      ))}
    </div>
  );
}

export const AppHeaderClassicContainerSkeleton = memo(AppHeaderClassicContainerSkeletonComponent);
AppHeaderClassicContainerSkeleton.displayName = 'AppHeaderClassicContainerSkeleton';
