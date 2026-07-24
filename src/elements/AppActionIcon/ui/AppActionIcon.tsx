import type { AppActionIconProps } from '../types';

import { forwardRef } from 'react';

import { ActionIcon } from '@mantine/core';

import { resolveAppButtonHrefState, useAppHrefClickHandler } from '@/shared/lib';

function hasActionIconContent(name?: string, img?: string): boolean {
  return (img?.length ?? 0) > 0 || (name?.length ?? 0) > 0;
}

export const AppActionIcon = forwardRef<HTMLButtonElement, AppActionIconProps>(
  function AppActionIcon(
    {
      name,
      img,
      href: hrefProp,
      children,
      hidden = false,
      native = false,
      disabled,
      onClick,
      type = 'button',
      ...actionIconProps
    },
    ref,
  ) {
    const { href, disabledForHref } = resolveAppButtonHrefState(hrefProp, native);
    const hrefNavigationEnabled = href !== undefined;
    const navigateHref = useAppHrefClickHandler(href, hrefNavigationEnabled);

    if (hidden === true || hasActionIconContent(name, img) === false) return null;

    const handleClick = hrefNavigationEnabled
      ? (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        navigateHref(event);
      }
      : onClick;

    return (
      <ActionIcon
        ref={ref}
        {...actionIconProps}
        type={type}
        disabled={disabled ?? disabledForHref}
        onClick={handleClick}
      >
        {children}
      </ActionIcon>
    );
  },
);

AppActionIcon.displayName = 'AppActionIcon';
