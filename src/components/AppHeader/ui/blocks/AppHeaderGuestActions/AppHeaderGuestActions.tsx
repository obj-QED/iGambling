import type { AppHeaderMenuItem } from '../../../types/AppHeader.types';
import type { CSSProperties } from 'react';

import { memo } from 'react';

import { Button } from '@mantine/core';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';

import { useCssVarValue } from '@/shared/lib/useCssVarValue';
import { Button as MantineButton } from '@/shared/ui';



type AppHeaderGuestActionsProps = {
  loginItem?: AppHeaderMenuItem;
  registerItem?: AppHeaderMenuItem;
};

type AppHeaderGuestActionsGroupStyle = CSSProperties & {
  '--button-border-width': string;
  '--orientation': string;
  gap: string;
};

const GROUP_STYLE: AppHeaderGuestActionsGroupStyle = {
  '--button-border-width': 'var(--app-header-guest-actions-border-width, 0)',
  '--orientation': 'var(--app-header-guest-actions-orientation, horizontal)',
  gap: 'var(--app-header-guest-actions-gap, 8px)',
};

function resolveGroupOrientation(value: string): 'horizontal' | 'vertical' {
  return value === 'horizontal' ? 'horizontal' : 'vertical';
}

/** Guest actions в хедере через shared `Button` (CSS vars + Mantine внутри провайдера). */
function AppHeaderGuestActionsComponent({ loginItem, registerItem }: AppHeaderGuestActionsProps) {
  const loginLabel = loginItem?.name?.trim() || 'Вход';
  const registerLabel = registerItem?.name?.trim() || 'Регистрация';
  const orientation = resolveGroupOrientation(
    useCssVarValue('--app-header-guest-actions-orientation', 'horizontal'),
  );

  return (
    <Button.Group
      orientation={orientation}
      borderWidth={GROUP_STYLE['--button-border-width']}
      style={GROUP_STYLE}
    >
      <MantineButton
        url={loginItem?.url || '/auth'}
        aria-label={loginLabel}
        varsKey="header-btn-login"
        leftSection={<IconLogin size={18} aria-hidden />}
      >
        {loginLabel}
      </MantineButton>
      <MantineButton
        url={registerItem?.url || '/register'}
        aria-label={registerLabel}
        varsKey="header-btn-register"
        leftSection={<IconUserPlus size={18} aria-hidden />}
      >
        {registerLabel}
      </MantineButton>
    </Button.Group>
  );
}

export const AppHeaderGuestActions = memo(AppHeaderGuestActionsComponent);
AppHeaderGuestActions.displayName = 'AppHeaderGuestActions';
