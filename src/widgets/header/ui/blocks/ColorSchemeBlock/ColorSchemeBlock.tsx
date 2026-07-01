import type { BlockProps } from '../../../types';

import { memo, useCallback } from 'react';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSunHigh } from '@tabler/icons-react';
import clsx from 'clsx';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuActionIconSize } from '../../../lib/headerMenuSize';
import { menuItemDataAttrs } from '../../../lib/itemUtils';
import { HEADER_TABLER_ICON_PROPS } from '../../menu/icons/iconProps';

import styles from '../../../styles/blocks/ColorSchemeBlock.module.scss';
import menuIconStyles from '../../../styles/menu/HeaderMenuIcon.module.scss';

function ColorSchemeBlockComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleToggle = useCallback(() => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }, [computedColorScheme, setColorScheme]);

  return (
    <ActionIcon
      className={styles.root}
      onClick={handleToggle}
      variant="default"
      size={resolveHeaderMenuActionIconSize(menuSizes)}
      aria-label="Toggle color scheme"
      {...menuItemDataAttrs(item)}
    >
      <IconSunHigh
        {...HEADER_TABLER_ICON_PROPS}
        className={clsx(menuIconStyles.glyph, styles.light)}
      />
      <IconMoon {...HEADER_TABLER_ICON_PROPS} className={clsx(menuIconStyles.glyph, styles.dark)} />
    </ActionIcon>
  );
}

export const ColorSchemeBlock = memo(ColorSchemeBlockComponent);
ColorSchemeBlock.displayName = 'ColorSchemeBlock';
