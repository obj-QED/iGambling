import type { MergeModuleClassKeyFn } from '@/shared/lib';

import { memo } from 'react';

import classNames from 'classnames';


/** Форма иконки в слоте user actions. */
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
  text?: string;
};

/** Колонка справа для авторизованного пользователя: выход. */
function AppHeaderUserActionsComponent({
  merge,
  classKey = 'root__userActions-item',
  iconShape = 'square',
  text = 'Logout',
}: AppHeaderUserActionsComponentProps) {
  return (
    <span className={classNames('inline-icon', merge?.(classKey))}>
      <i
        className={classNames('icon-i', merge?.(`${classKey}_icon_logout`), ICON_SHAPE_CLASS[iconShape])}
        aria-hidden
      />
      {text}
    </span>
  );
}

export const AppHeaderUserActions = memo(AppHeaderUserActionsComponent);
AppHeaderUserActions.displayName = 'AppHeaderUserActions';
