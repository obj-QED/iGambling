import { memo } from 'react';

import styles from '../../../styles/base/AppHeaderSkeletonBase.module.scss';

type AppHeaderClassicFluidSkeletonProps = {
  sectionCount: number;
};

function AppHeaderClassicFluidSkeletonComponent({ sectionCount }: AppHeaderClassicFluidSkeletonProps) {
  if (sectionCount === 1) {
    return (
      <div className={`${styles.skeleton} ${styles['skeleton--single']} ${styles['skeleton--classic']} ${styles['skeleton--fluid']}`}>
        <div className={styles.skeleton__bar} />
      </div>
    );
  }

  return (
    <div className={`${styles.skeleton} ${styles['skeleton--classic']} ${styles['skeleton--fluid']}`}>
      {Array.from({ length: sectionCount }, (_, i) => (
        <div key={i} className={styles.skeleton__segment} />
      ))}
    </div>
  );
}

export const AppHeaderClassicFluidSkeleton = memo(AppHeaderClassicFluidSkeletonComponent);
AppHeaderClassicFluidSkeleton.displayName = 'AppHeaderClassicFluidSkeleton';
