import type { CSSProperties, MouseEvent, ReactNode, Ref } from 'react';

import { forwardRef } from 'react';

import { Link } from 'react-router-dom';

import { getAppHrefKind } from '@shared/lib';

export type AppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  title?: string;
  'aria-label'?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export const AppLink = forwardRef<HTMLElement, AppLinkProps>(function AppLink(
  { href, children, onClick, ...rest },
  ref,
) {
  const kind = getAppHrefKind(href);

  if (kind === 'external') {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (kind === 'invalid') {
    return (
      <span ref={ref as Ref<HTMLSpanElement>} data-invalid-href onClick={onClick} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <Link ref={ref as Ref<HTMLAnchorElement>} to={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
});

AppLink.displayName = 'AppLink';
