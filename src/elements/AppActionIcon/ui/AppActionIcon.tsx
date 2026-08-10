import type { AppActionIconProps } from '../types';

import { forwardRef, isValidElement, type ReactNode } from 'react';

import { ActionIcon } from '@mantine/core';

import { resolveAppButtonHrefState, useAppHrefClickHandler } from '@/shared/lib';
import {
  CmfActiveLine,
  shouldRenderCmfActiveLine,
  useCmfActiveIndicator,
} from '@/shared/ui/CmfActiveLine';

function hasActionIconContent(name?: string, img?: string, children?: ReactNode): boolean {
  if ((img?.length ?? 0) > 0 || (name?.length ?? 0) > 0) return true;
  if (children == null || children === false) return false;
  if (typeof children === 'string' || typeof children === 'number') return true;
  if (Array.isArray(children)) {
    return children.some((child) => hasActionIconContent(undefined, undefined, child));
  }
  return isValidElement(children);
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
    const resolvedDisabled = disabled ?? disabledForHref;
    const { type: activeType } = useCmfActiveIndicator();

    if (hidden === true || hasActionIconContent(name, img, children) === false) return null;

    const handleClick = hrefNavigationEnabled
      ? (event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          navigateHref(event);
        }
      : onClick;

    const showActiveLine = shouldRenderCmfActiveLine({
      ...actionIconProps,
      disabled: resolvedDisabled,
      activeType,
    });

    return (
      <ActionIcon
        ref={ref}
        {...actionIconProps}
        type={type}
        disabled={resolvedDisabled}
        onClick={handleClick}
      >
        {children}
        {showActiveLine && <CmfActiveLine control="ai" />}
      </ActionIcon>
    );
  },
);

AppActionIcon.displayName = 'AppActionIcon';
