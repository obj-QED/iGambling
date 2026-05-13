import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { AppHeaderSkeletonSegments } from '@AppHeader/ui/skeletons/AppHeaderSkeletonSegments';

import appHeaderStyles from '@AppHeader/styles/base/AppHeaderBase.module.scss';
import baseStyles from '@AppHeader/styles/base/AppHeaderSkeletonBase.module.scss';
import variantStyles from '@AppHeader/styles/variants/AppHeaderDefault.module.scss';

type AppHeaderDefaultSkeletonProps = {
  menu?: AppHeaderMenuItem[];
};

function AppHeaderDefaultSkeletonComponent({ menu }: AppHeaderDefaultSkeletonProps) {
  return (
    <div className={variantStyles.skeleton}>
      <AppHeaderSkeletonSegments
        layoutClassName={appHeaderStyles.root__sections}
        sectionClassName={appHeaderStyles.root__section}
        className={`${baseStyles.skeleton__item} ${variantStyles.skeleton__item}`}
        menu={menu}
      />
    </div>
  );
}

export const AppHeaderDefaultSkeleton = memo(AppHeaderDefaultSkeletonComponent);
AppHeaderDefaultSkeleton.displayName = 'AppHeaderDefaultSkeleton';
