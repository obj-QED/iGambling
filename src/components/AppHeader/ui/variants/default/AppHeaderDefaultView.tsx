import type { AppHeaderViewProps } from '../../../types/AppHeader.types';

import { memo, useMemo } from 'react';

import { LAYOUT_COMPONENTS, SKELETON_COMPONENTS } from '../../AppHeader';

import baseStyles from '@AppHeader/styles/base/AppHeaderBase.module.scss';
import defaultStyles from '@AppHeader/styles/variants/AppHeaderDefault.module.scss';

function AppHeaderDefaultViewComponent({ params, data, loading }: AppHeaderViewProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[params.layout];
  const SkeletonComponent = SKELETON_COMPONENTS[params.variant];
  /** `loading` из хука уже учитывает pending/fetching и отсутствие menuHeaderTop. */
  const showSkeleton = loading;

  const rootClassName = useMemo(
    () => `${baseStyles.root} ${defaultStyles.root}`,
    [],
  );

  const skeletonClassName = useMemo(
    () => `${baseStyles.root__skeleton}${showSkeleton ? ` ${baseStyles['root__skeleton--visible']}` : ''}`,
    [showSkeleton],
  );


  return (
    <header className={rootClassName} data-variant="default">
      <LayoutComponent>
        <div className={baseStyles.root__sections}>
          {data?.menu?.map((item) => (
            <span key={item.key}
            // className={baseStyles.root__section}
            >{item.name}</span>
          ))}
        </div>
      </LayoutComponent>
      {showSkeleton ? (
        <div className={skeletonClassName} data-testid="app-header-skeleton">
          <SkeletonComponent />
        </div>
      ) : null}
    </header>
  );
}

export const AppHeaderDefaultView = memo(AppHeaderDefaultViewComponent);
AppHeaderDefaultView.displayName = 'AppHeaderDefaultView';
