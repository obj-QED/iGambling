import type { AppButtonProps } from '../types';

import { forwardRef } from 'react';

import { Button } from '@mantine/core';

import { resolveAppButtonHrefState, useAppHrefClickHandler } from '@/shared/lib';

import { hasAppButtonContent } from '../types/props.types';

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(
  {
    label,
    href: hrefProp,
    native = false,
    disabled,
    leftSection,
    rightSection,
    onClick,
    type = 'button',
    justify,
    fullscreen = false,
    ...buttonProps
  },
  ref,
) {
  const { href, disabledForHref } = resolveAppButtonHrefState(hrefProp, native);
  const hrefNavigationEnabled = href !== undefined;
  const navigateHref = useAppHrefClickHandler(href, hrefNavigationEnabled);

  if (!hasAppButtonContent(label, leftSection, rightSection)) return null;

  const handleClick = hrefNavigationEnabled
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        navigateHref(event);
      }
    : onClick;

  return (
    <Button
      ref={ref}
      {...buttonProps}
      type={type}
      disabled={disabled ?? disabledForHref}
      leftSection={leftSection}
      rightSection={rightSection}
      onClick={handleClick}
      justify={justify}
      fullWidth={fullscreen}
    >
      {label ?? null}
    </Button>
  );
});

AppButton.displayName = 'AppButton';
