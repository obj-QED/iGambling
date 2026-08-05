import type { BlockProps } from '../../../types';

import { memo, useCallback } from 'react';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSunHigh } from '@tabler/icons-react';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { useHeaderMenuSizes } from '../../../context';
import { resolveHeaderMenuActionIconSize, resolveMenuItemActionIconVariant } from '../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../items/icons/iconProps';
import { HeaderActionIconTooltip } from '../../shared/HeaderActionIconTooltip';

function ColorSchemeBlockComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleToggle = useCallback(() => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }, [computedColorScheme, setColorScheme]);

  return (
    <HeaderActionIconTooltip item={item}>
      <ActionIcon
        onClick={handleToggle}
        variant={resolveMenuItemActionIconVariant(item)}
        size={resolveHeaderMenuActionIconSize(menuSizes)}
        aria-label={item.name?.trim() || 'Toggle color scheme'}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
      >
        {computedColorScheme === 'light' ? (
          <IconSunHigh {...HEADER_TABLER_ICON_PROPS} />
        ) : (
          <IconMoon {...HEADER_TABLER_ICON_PROPS} />
        )}
      </ActionIcon>
    </HeaderActionIconTooltip>
  );
}

export const ColorSchemeBlock = memo(ColorSchemeBlockComponent);
ColorSchemeBlock.displayName = 'ColorSchemeBlock';
