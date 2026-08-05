import type { AppLinkProps } from './types';

import { forwardRef } from 'react';

import { Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

import { useNavActive } from '@/shared/hooks';
import { getAppHrefKind } from '@/shared/lib';

export type { AppLinkProps } from './types';

/**
 * Mantine {@link https://mantine.dev/core/anchor/ Anchor} + routing:
 * - internal → `component={Link}` + `to`
 * - external → native `href` + `target="_blank"`
 * - invalid → `Anchor component="span"` + `data-invalid-href`
 *
 * Active route: `data-active` + `aria-current="page"`.
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { href, children, active, matchRoute, activeMatch, ...rest },
  ref,
) {
  const kind = getAppHrefKind(href);
  const { isActive, activeAttrs } = useNavActive({
    url: href,
    active,
    matchRoute,
    activeMatch,
  });

  const navAttrs = {
    ...activeAttrs,
    ...(isActive ? ({ 'aria-current': 'page' } as const) : {}),
  };

  if (kind === 'invalid') {
    return (
      <Anchor
        ref={ref as React.Ref<HTMLSpanElement>}
        component="span"
        data-invalid-href
        aria-disabled="true"
        {...rest}
      >
        {children}
      </Anchor>
    );
  }

  if (kind === 'internal') {
    return (
      <Anchor ref={ref} component={Link} to={href} {...rest} {...navAttrs}>
        {children}
      </Anchor>
    );
  }

  if (kind === 'external') {
    return (
      <Anchor
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
        {...navAttrs}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <Anchor ref={ref} href={href} {...rest} {...navAttrs}>
      {children}
    </Anchor>
  );
});

AppLink.displayName = 'AppLink';
