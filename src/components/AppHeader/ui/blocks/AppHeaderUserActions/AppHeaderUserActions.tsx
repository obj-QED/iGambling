import type { MergedModuleClasses } from '@/shared/lib';

import { memo } from 'react';

import classNames from 'classnames';


/** Icon shape in the user actions slot. */
export type AppHeaderUserActionsIconShape = 'square' | 'rect' | 'circle';

const ICON_SHAPE_CLASS: Record<AppHeaderUserActionsIconShape, string> = {
  square: 'icon-shape-square',
  rect: 'icon-shape-rect',
  circle: 'icon-shape-circle',
};

type AppHeaderUserActionsComponentProps = {
  classes?: MergedModuleClasses;
  /** SCSS stem, e.g. `root__userActions-item` -> class `..._icon_logout`. */
  classKey?: string;
  iconShape?: AppHeaderUserActionsIconShape;
  text?: string;
};

/** Right column for authenticated user: logout action. */
function AppHeaderUserActionsComponent({
  classes,
  classKey = 'root__userActions-item',
  iconShape = 'square',
  text = 'Logout',
}: AppHeaderUserActionsComponentProps) {
  const iconClassKey = `${classKey}_icon_logout`;

  return (
    <span className={classNames('inline-icon', classes?.[classKey])}>
      <i className={classNames('icon-i', classes?.[iconClassKey], ICON_SHAPE_CLASS[iconShape])} aria-hidden />
      {text}
    </span>
  );
}

export const AppHeaderUserActions = memo(AppHeaderUserActionsComponent);
AppHeaderUserActions.displayName = 'AppHeaderUserActions';
