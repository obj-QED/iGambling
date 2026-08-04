import type { ReactNode } from 'react';

export type OverlayTargetProps = {
  children: ReactNode;
  /** Trigger element (cloned / wrapped as needed). */
  target: ReactNode;
  opened?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  className?: string;
};
