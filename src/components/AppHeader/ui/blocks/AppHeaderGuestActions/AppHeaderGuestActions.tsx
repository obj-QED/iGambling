import { memo } from 'react';

/** Right column for guest: sign-in action. */
function AppHeaderGuestActionsComponent() {
  return <span>Login</span>;
}

export const AppHeaderGuestActions = memo(AppHeaderGuestActionsComponent);
AppHeaderGuestActions.displayName = 'AppHeaderGuestActions';
