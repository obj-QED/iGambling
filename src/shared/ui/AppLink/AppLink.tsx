import type { CSSProperties, MouseEvent, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { getAppHrefKind } from '@/shared/lib';

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

export function AppLink({ href, children, onClick, ...rest }: AppLinkProps) {
  const kind = getAppHrefKind(href);

  if (kind === 'external') {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (kind === 'invalid') {
    return (
      <span data-invalid-href onClick={onClick} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <Link to={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

AppLink.displayName = 'AppLink';
