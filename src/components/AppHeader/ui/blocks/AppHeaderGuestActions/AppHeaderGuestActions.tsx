import type { AppHeaderMenuItem } from '../../../types/AppHeader.types';

import { memo } from 'react';

import { Button } from '@mantine/core';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import styles from './AppHeaderGuestActions.module.scss';

type AppHeaderGuestActionsProps = {
  loginItem?: AppHeaderMenuItem;
  registerItem?: AppHeaderMenuItem;
};

/** Guest actions in the header: login / register as Mantine buttons with icons + router links. */
function AppHeaderGuestActionsComponent({ loginItem, registerItem }: AppHeaderGuestActionsProps) {
  const loginLabel = loginItem?.name?.trim() || 'Вход';
  const registerLabel = registerItem?.name?.trim() || 'Регистрация';

  return (
    <div className={styles.root}>
      <Button
        component={Link}
        to={loginItem?.url || '/auth'}
        leftSection={<IconLogin size={18} aria-hidden />}
      >
        {loginLabel}
      </Button>
      <Button
        component={Link}
        to={registerItem?.url || '/register'}
        leftSection={<IconUserPlus size={18} aria-hidden />}
      >
        {registerLabel}
      </Button>
    </div>
  );
}

export const AppHeaderGuestActions = memo(AppHeaderGuestActionsComponent);
AppHeaderGuestActions.displayName = 'AppHeaderGuestActions';
