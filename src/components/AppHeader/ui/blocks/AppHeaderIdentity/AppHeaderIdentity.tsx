import { memo } from 'react';

export type AppHeaderIdentityProps = {
  isAuthenticated: boolean;
};

/** Подпись слева от лого: гость или аккаунт. */
function AppHeaderIdentityComponent({ isAuthenticated }: AppHeaderIdentityProps) {
  return <span>{isAuthenticated ? 'Account' : 'Guest'}</span>;
}

export const AppHeaderIdentity = memo(AppHeaderIdentityComponent);
AppHeaderIdentity.displayName = 'AppHeaderIdentity';
