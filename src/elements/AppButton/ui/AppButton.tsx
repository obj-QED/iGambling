import type { AppButtonProps } from '../types';

import { forwardRef } from 'react';

import { Button } from '@mantine/core';

import { resolveAppButtonHrefState, useAppHrefClickHandler } from '@/shared/lib';
import {
  CmfActiveLine,
  shouldRenderCmfActiveLine,
  useCmfActiveIndicator,
} from '@/shared/ui/CmfActiveLine';

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
  const resolvedDisabled = disabled ?? disabledForHref;
  const { type: activeType } = useCmfActiveIndicator();

  if (!hasAppButtonContent(label, leftSection, rightSection)) return null;

  const handleClick = hrefNavigationEnabled
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        navigateHref(event);
      }
    : onClick;

  const showActiveLine = shouldRenderCmfActiveLine({
    ...buttonProps,
    disabled: resolvedDisabled,
    activeType,
  });

  return (
    <Button
      ref={ref}
      {...buttonProps}
      type={type}
      disabled={resolvedDisabled}
      leftSection={leftSection}
      rightSection={rightSection}
      onClick={handleClick}
      justify={justify}
      fullWidth={fullscreen}
    >
      {label ?? null}
      {showActiveLine && <CmfActiveLine control="button" />}
    </Button>
  );
});

AppButton.displayName = 'AppButton';
