import { memo } from 'react';

export type AppHeaderIdentityProps = {
  isAuthenticated: boolean;
};

/** Label to the left of logo: guest or account. */
function AppHeaderIdentityComponent({ isAuthenticated }: AppHeaderIdentityProps) {
  return <span>{isAuthenticated ? 'Account' : 'Guest'}</span>;
}

export const AppHeaderIdentity = memo(AppHeaderIdentityComponent);
AppHeaderIdentity.displayName = 'AppHeaderIdentity';
