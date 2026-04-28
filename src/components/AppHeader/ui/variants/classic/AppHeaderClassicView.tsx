import type { AppHeaderViewProps } from '../../../types/AppHeader.types';

import { memo, useMemo } from 'react';

import { LAYOUT_COMPONENTS, SKELETON_COMPONENTS } from '../../AppHeader';

import baseStyles from '../../../styles/base/AppHeaderBase.module.scss';
import classicStyles from '../../../styles/variants/AppHeaderClassic.module.scss';

function AppHeaderClassicViewComponent({ params, data, loading }: AppHeaderViewProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[params.layout];
  const SkeletonComponent = SKELETON_COMPONENTS[params.variant];
  const showSkeleton = loading;

  const rootClassName = useMemo(
    () => `${baseStyles.root} ${classicStyles.root}`,
    [],
  );

  const skeletonClassName = useMemo(
    () => `${baseStyles.root__skeleton}${showSkeleton ? ` ${baseStyles['root__skeleton--visible']}` : ''}`,
    [showSkeleton],
  );

  const menu = data?.menu;
  const logo = menu?.find((item) => item.key === 'logo');
  const menuItems = useMemo(
    () => menu?.filter((item) => item.key !== 'logo'),
    [menu],
  );

  return (
    <header className={rootClassName} data-variant="classic">
      <LayoutComponent>
        <div className={classicStyles.shell}>
          <div className={classicStyles.brand}>
            <div className={baseStyles.root__logo}>{logo?.img ? <img src={logo.img} alt={logo.name} /> : 'IG'}</div>
          </div>
          <div className={classicStyles.main}>
            {menuItems?.map((item) => (
              <span key={item.key}>{item.name}</span>
            ))}
          </div>
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

export const AppHeaderClassicView = memo(AppHeaderClassicViewComponent);
AppHeaderClassicView.displayName = 'AppHeaderClassicView';
