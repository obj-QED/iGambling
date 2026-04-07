import { memo } from 'react';

/** Колонка справа для гостя: вход. */
function AppHeaderGuestActionsComponent() {
  return <span>Login</span>;
}

export const AppHeaderGuestActions = memo(AppHeaderGuestActionsComponent);
AppHeaderGuestActions.displayName = 'AppHeaderGuestActions';
