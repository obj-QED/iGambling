import type { PopoverSettings } from '@/shared/config/overlaySettings';
import type { CmfControlAttrs } from '@/shared/lib/cmf/types/scopeAttrs.types';
import type { PopoverProps } from '@mantine/core';
import type { ReactNode } from 'react';

/** Shared overlay trigger contract (Modal / Drawer / Popover wrappers). */
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

/**
 * PopoverWrapper = overlay trigger API + any Mantine Popover prop
 * (merged with `params.popover`; instance wins).
 * @see https://mantine.dev/core/popover/?t=props
 */
export type PopoverWrapperProps = OverlayTargetProps &
  PopoverSettings & {
    classNames?: PopoverProps['classNames'];
  };
