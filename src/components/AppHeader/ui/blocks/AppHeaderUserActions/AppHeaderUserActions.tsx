import type { MergedModuleClasses } from '@/shared/lib';
import type { ReactNode } from 'react';

import { memo } from 'react';

import { type InlineIconShape, type InlineIconTag, InlineIconText } from '@/shared/ui';

/** Icon shape in the user actions slot. */
export type AppHeaderUserActionsIconShape = InlineIconShape;
export type AppHeaderUserActionsIconTag = InlineIconTag;

type AppHeaderUserActionsComponentProps = {
  classes?: MergedModuleClasses;
  /** SCSS stem, e.g. `root__userActions-item` -> class `..._icon_logout`. */
  classKey?: string;
  icon?: ReactNode;
  iconAlt?: string;
  iconKey?: string;
  iconShape?: AppHeaderUserActionsIconShape;
  iconSrc?: string;
  iconTag?: AppHeaderUserActionsIconTag;
  text?: string;
};

/** Right column for authenticated user: logout action. */
function AppHeaderUserActionsComponent({
  classes,
  classKey = 'root__userActions-item',
  icon,
  iconAlt,
  iconKey = 'logout',
  iconShape = 'square',
  iconSrc,
  iconTag = 'i',
  text = 'Logout',
}: AppHeaderUserActionsComponentProps) {
  const iconClassKey = `${classKey}_icon_logout`;

  return (
    <InlineIconText
      className={classes?.[classKey]}
      icon={icon}
      iconAlt={iconAlt}
      iconClassName={classes?.[iconClassKey]}
      iconKey={iconTag === 'i' ? iconKey : undefined}
      iconShape={iconShape}
      iconSrc={iconSrc}
      iconTag={iconTag}
    >
      {text}
    </InlineIconText>
  );
}

export const AppHeaderUserActions = memo(AppHeaderUserActionsComponent);
AppHeaderUserActions.displayName = 'AppHeaderUserActions';
