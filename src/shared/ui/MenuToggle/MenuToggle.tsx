import type { MenuToggleProps } from './types/props.types';

import { forwardRef, memo } from 'react';

import { ActionIcon } from '@mantine/core';
import {
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarLeftExpandFilled,
} from '@tabler/icons-react';

const TABLER_ICON_PROPS = {
  stroke: 2,
  className: 'cmf-ActionIcon-icon-svg',
} as const;

export const MenuToggle = memo(
  forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle(
    {
      opened,
      onClick,
      'aria-label': ariaLabel,
      size,
      variant = 'subtle',
      className,
      ...actionIconProps
    },
    ref,
  ) {
    const label = ariaLabel?.trim() || (opened ? 'Collapse sidebar menu' : 'Expand sidebar menu');

    return (
      <ActionIcon
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        className={className}
        aria-label={label}
        aria-expanded={opened}
        onClick={onClick}
        {...actionIconProps}
      >
        {opened ? (
          <IconLayoutSidebarLeftCollapseFilled {...TABLER_ICON_PROPS} />
        ) : (
          <IconLayoutSidebarLeftExpandFilled {...TABLER_ICON_PROPS} />
        )}
      </ActionIcon>
    );
  }),
);

MenuToggle.displayName = 'MenuToggle';
