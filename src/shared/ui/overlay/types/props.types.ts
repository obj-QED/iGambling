import type { DrawerSettings, MenuSettings, ModalSettings, PopoverSettings } from '@/shared/config';
import type { CmfControlAttrs } from '@/shared/lib/cmf';
import type { ModalProps, PopoverProps } from '@mantine/core';
import type { ReactNode } from 'react';

/**
 * Shared overlay trigger contract (Modal / Drawer / Popover wrappers).
 * Place-level settings: pass `defaults` (e.g. `aside.drawer` / `header.menu`).
 * Cascade: `params.*` → `defaults` → instance props.
 */
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
 * DrawerWrapper = overlay trigger + any Mantine Drawer prop
 * (`params.drawer` → `defaults` → instance).
 * @see https://mantine.dev/core/drawer/?t=props
 */
export type DrawerWrapperProps = OverlayTargetProps &
  Omit<DrawerSettings, 'classNames'> & {
    /** Place overrides (sidebar / header / page). Wins over `params.drawer`. */
    defaults?: Omit<DrawerSettings, 'classNames'>;
  };

/**
 * ModalWrapper = overlay trigger + any Mantine Modal prop
 * (`params.modal` → `defaults` → instance).
 * @see https://mantine.dev/core/modal/?t=props
 */
export type ModalWrapperProps = OverlayTargetProps &
  ModalSettings & {
    defaults?: ModalSettings;
    classNames?: ModalProps['classNames'];
  };

/**
 * PopoverWrapper = overlay trigger + any Mantine Popover prop
 * (`params.popover` → `defaults` → instance).
 * @see https://mantine.dev/core/popover/?t=props
 */
export type PopoverWrapperProps = OverlayTargetProps &
  PopoverSettings & {
    defaults?: PopoverSettings;
    classNames?: PopoverProps['classNames'];
  };

/** Re-export for DeepPanel / Menu hosts. */
export type { MenuSettings };
