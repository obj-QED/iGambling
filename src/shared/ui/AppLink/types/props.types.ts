import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLElement>, 'href'> & {
  href: string;
  children: ReactNode;
};
