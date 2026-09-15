import type { ReactNode } from 'react';

export type AppearWipeProps = {
  children: ReactNode;
  /**
   * Stable identity for the content. Change → exit wipe + enter appear
   * (same as Info CMS `contentKey`).
   */
  contentKey: string;
  className?: string;
  panelClassName?: string;
};
