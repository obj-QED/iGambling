import type { AppActionIconProps } from '../types';

import { forwardRef } from 'react';

import { ActionIcon } from '@mantine/core';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

function hasActionIconContent(name?: string, img?: string): boolean {
  return (img?.length ?? 0) > 0 || (name?.length ?? 0) > 0;
}

export const AppActionIcon = forwardRef<HTMLButtonElement, AppActionIconProps>(
  function AppActionIcon(
    { name, img, href, children, hidden = false, native = false, disabled, ...actionIconProps },
    ref,
  ) {
    if (hidden === true || hasActionIconContent(name, img) === false) return null;

    if (native === true) {
      return (
        <ActionIcon ref={ref} disabled={disabled} {...actionIconProps}>
          {children}
        </ActionIcon>
      );
    }

    if (href === undefined || isValidAppHref(href) === false) {
      return (
        <ActionIcon ref={ref} disabled {...actionIconProps}>
          {children}
        </ActionIcon>
      );
    }

    return (
      <ActionIcon
        ref={ref}
        component={AppLink}
        href={href}
        disabled={disabled}
        {...actionIconProps}
      >
        {children}
      </ActionIcon>
    );
  },
);

AppActionIcon.displayName = 'AppActionIcon';
