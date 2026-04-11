import { memo } from 'react';

import baseStyles from '../../styles/base/AppHeaderSkeletonBase.module.scss';
import variantStyles from '../../styles/variants/AppHeaderDefault.module.scss';

function AppHeaderDefaultSkeletonComponent() {
  return (
    <div className={`${baseStyles.skeleton} ${variantStyles.skeleton}`}>
      <div className={`${baseStyles.skeleton__segment} ${variantStyles.skeleton__segment}`} />
      <div className={`${baseStyles.skeleton__segment} ${variantStyles.skeleton__segment}`} />
      <div className={`${baseStyles.skeleton__segment} ${variantStyles.skeleton__segment}`} />
    </div>
  );
}

export const AppHeaderDefaultSkeleton = memo(AppHeaderDefaultSkeletonComponent);
AppHeaderDefaultSkeleton.displayName = 'AppHeaderDefaultSkeleton';
