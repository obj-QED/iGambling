import type { MergeModuleClassKeyFn } from '@/shared/lib';

import { memo } from 'react';

// import { IconLogout2 } from '@tabler/icons-react';
import classNames from 'classnames';


/** Форма слота иконки (фон из `--icon-logout` + глобальные `icon-shape-*`). */
export type AppHeaderUserActionsIconShape = 'square' | 'rect' | 'circle';

const ICON_SHAPE_CLASS: Record<AppHeaderUserActionsIconShape, string> = {
  square: 'icon-shape-square',
  rect: 'icon-shape-rect',
  circle: 'icon-shape-circle',
};

type AppHeaderUserActionsComponentProps = {
  merge?: MergeModuleClassKeyFn;
  /** Stem из SCSS, напр. `root__userActions-item` → класс `…_icon_logout`. */
  classKey?: string;
  iconShape?: AppHeaderUserActionsIconShape;
};

/** Колонка справа для авторизованного пользователя: выход. */
function AppHeaderUserActionsComponent({
  merge,
  classKey = 'root__userActions-item',
  iconShape = 'square',
}: AppHeaderUserActionsComponentProps) {
  return (
    <span className={classNames('inline-icon', merge?.(classKey))}>
      {/* <IconLogout2 stroke={1.5} size={16} className={classNames(merge?.(`${classKey}_icon_logout`), ICON_SHAPE_CLASS[iconShape])} /> */}
      <i className={classNames(merge?.(`${classKey}_icon_logout`), ICON_SHAPE_CLASS[iconShape])}
      />
      Logout
    </span>
  );
}

export const AppHeaderUserActions = memo(AppHeaderUserActionsComponent);
AppHeaderUserActions.displayName = 'AppHeaderUserActions';
