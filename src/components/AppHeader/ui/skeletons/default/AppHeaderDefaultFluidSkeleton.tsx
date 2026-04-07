import { memo } from 'react';

import styles from '../../../styles/base/AppHeaderSkeletonBase.module.scss';

type AppHeaderDefaultFluidSkeletonProps = {
  sectionCount: number;
};

function AppHeaderDefaultFluidSkeletonComponent({ sectionCount }: AppHeaderDefaultFluidSkeletonProps) {
  if (sectionCount === 1) {
    return (
      <div className={`${styles.skeleton} ${styles['skeleton--single']} ${styles['skeleton--fluid']}`}>
        <div className={styles.skeleton__bar} />
      </div>
    );
  }

  return (
    <div className={`${styles.skeleton} ${styles['skeleton--fluid']}`}>
      {Array.from({ length: sectionCount }, (_, i) => (
        <div key={i} className={styles.skeleton__segment} />
      ))}
    </div>
  );
}

export const AppHeaderDefaultFluidSkeleton = memo(AppHeaderDefaultFluidSkeletonComponent);
AppHeaderDefaultFluidSkeleton.displayName = 'AppHeaderDefaultFluidSkeleton';
