import type { CmfControlAttrs } from '@/shared/lib/cmf/types/scopeAttrs.types';
import type { ReactNode } from 'react';

export type OverlayTargetProps = {
  children: ReactNode;
  /** Trigger element (cloned / wrapped as needed). */
  target: ReactNode;
  opened?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  className?: string;
  /** Portal mount node (e.g. `.cmf-Layout-content`). Default: `document.body`. */
  portalTarget?: HTMLElement | string | null;
} & CmfControlAttrs;
