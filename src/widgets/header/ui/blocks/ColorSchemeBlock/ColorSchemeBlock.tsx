import type { BlockProps } from '../../../types';

import { memo, useCallback } from 'react';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSunHigh } from '@tabler/icons-react';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuActionIconSize } from '../../../lib/headerMenuSize';
import { menuItemDataAttrs } from '../../../lib/itemUtils';
import { HEADER_TABLER_ICON_PROPS } from '../../menu/icons/iconProps';

function ColorSchemeBlockComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleToggle = useCallback(() => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }, [computedColorScheme, setColorScheme]);

  return (
    <ActionIcon
      onClick={handleToggle}
      variant="default"
      size={resolveHeaderMenuActionIconSize(menuSizes)}
      aria-label="Toggle color scheme"
      {...menuItemDataAttrs(item)}
    >
      {computedColorScheme === 'light' ? (
        <IconSunHigh {...HEADER_TABLER_ICON_PROPS} />
      ) : (
        <IconMoon {...HEADER_TABLER_ICON_PROPS} />
      )}
    </ActionIcon>
  );
}

export const ColorSchemeBlock = memo(ColorSchemeBlockComponent);
ColorSchemeBlock.displayName = 'ColorSchemeBlock';
