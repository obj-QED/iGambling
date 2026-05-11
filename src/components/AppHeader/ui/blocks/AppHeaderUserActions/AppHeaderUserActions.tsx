import type { MergedModuleClasses } from '@/shared/lib';

import { memo } from 'react';

import { type InlineIconShape,InlineIconText } from '@/shared/ui';

/** Icon shape in the user actions slot. */
export type AppHeaderUserActionsIconShape = InlineIconShape;

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
    <InlineIconText
      className={classes?.[classKey]}
      iconClassName={classes?.[iconClassKey]}
      iconShape={iconShape}
    >
      {text}
    </InlineIconText>
  );
}

export const AppHeaderUserActions = memo(AppHeaderUserActionsComponent);
AppHeaderUserActions.displayName = 'AppHeaderUserActions';
