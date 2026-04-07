import { memo } from 'react';

/** Колонка справа для авторизованного пользователя: выход. */
function AppHeaderUserActionsComponent() {
  return <span>Logout</span>;
}

export const AppHeaderUserActions = memo(AppHeaderUserActionsComponent);
AppHeaderUserActions.displayName = 'AppHeaderUserActions';
