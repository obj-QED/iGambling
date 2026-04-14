import type { AppHeaderViewProps } from '../../../types/AppHeader.types';

import { memo, useMemo } from 'react';

import { useMergeModuleClassKey } from '@/shared/lib';

import { LAYOUT_COMPONENTS, SKELETON_COMPONENTS } from '../../AppHeader';
import { AppHeaderUserActions } from '../../blocks/AppHeaderUserActions/AppHeaderUserActions';

import baseStyles from '@AppHeader/styles/base/AppHeaderBase.module.scss';
import defaultStyles from '@AppHeader/styles/variants/AppHeaderDefault.module.scss';

function AppHeaderDefaultViewComponent({ params, data, loading }: AppHeaderViewProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[params.layout];
  const SkeletonComponent = SKELETON_COMPONENTS[params.variant];
  /** `loading` из хука уже учитывает pending/fetching и отсутствие menuHeaderTop. */
  const showSkeleton = loading;

  const m = useMergeModuleClassKey(baseStyles, defaultStyles);

  const skeletonClassName = useMemo(
    () => `${baseStyles.root__skeleton}${showSkeleton ? ` ${baseStyles['root__skeleton--visible']}` : ''}`,
    [showSkeleton],
  );

  return (
    <header className={m('root')}>
      <LayoutComponent>
        <div className={baseStyles.root__sections}>
          <div className={baseStyles.root__section}>
            {data?.menu?.map((item) => (
              <span key={item.key}>{item.name}</span>
            ))}
          </div>
          <div className={baseStyles.root__section}>
            <AppHeaderUserActions merge={m} classKey="root__userActions-item" />
          </div>
        </div>
      </LayoutComponent>
      {showSkeleton ? (
        <div className={skeletonClassName}>
          <SkeletonComponent />
        </div>
      ) : null}
    </header>
  );
}

export const AppHeaderDefaultView = memo(AppHeaderDefaultViewComponent);
AppHeaderDefaultView.displayName = 'AppHeaderDefaultView';
