import type { NavActiveMatch } from '@/shared/lib/menu';
import type { AnchorProps } from '@mantine/core';
import type { ReactNode } from 'react';

export type AppLinkProps = Omit<AnchorProps, 'href' | 'component' | 'children'> & {
  href: string;
  children?: ReactNode;
  /** Explicit active — overrides URL matching when set. */
  active?: boolean;
  /** When `false`, skip URL matching. Default: `true`. */
  matchRoute?: boolean;
  /** Internal route match mode. Default: `exact`. */
  activeMatch?: NavActiveMatch;
};
