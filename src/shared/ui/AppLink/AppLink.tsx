import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { getAppHrefKind } from '@/shared/lib';

export type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLElement>, 'href'> & {
  href: string;
  children: ReactNode;
};

export const AppLink = forwardRef<HTMLElement, AppLinkProps>(function AppLink(
  { href, children, className, ...rest },
  ref,
) {
  const kind = getAppHrefKind(href);

  if (kind === 'invalid') {
    return (
      <span ref={ref} className={className} data-invalid-href aria-disabled="true" {...rest}>
        {children}
      </span>
    );
  }

  if (kind === 'internal') {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  if (kind === 'external') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={className} {...rest}>
      {children}
    </a>
  );
});

AppLink.displayName = 'AppLink';
