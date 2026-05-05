import { memo } from 'react';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

function MantineColorSchemeToggleComponent() {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedScheme = useComputedColorScheme('dark');
  const isDark = computedScheme === 'dark';

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="md"
      radius="md"
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => toggleColorScheme()}
    >
      {isDark ? <IconSun size={20} aria-hidden /> : <IconMoon size={20} aria-hidden />}
    </ActionIcon>
  );
}

export const MantineColorSchemeToggle = memo(MantineColorSchemeToggleComponent);
MantineColorSchemeToggle.displayName = 'MantineColorSchemeToggle';
