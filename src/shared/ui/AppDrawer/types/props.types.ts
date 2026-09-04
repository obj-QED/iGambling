import type { BreakpointName } from '@/assets/theme/breakpoints';
import type { DrawerProps } from '@mantine/core';
import type { ReactNode } from 'react';

/**
 * `data-viewport` values — same bands as theme `--breakpoint-*` / `BREAKPOINTS_PX`
 * (`mobile` | `tablet` | `laptop` | `pc`).
 */
export type AppDrawerViewport = BreakpointName;

/** Object classNames only — Mantine's `ClassNames` union includes a function form. */
export type AppDrawerClassNames = Partial<{
  inner: string;
  content: string;
  header: string;
  body: string;
  overlay: string;
  title: string;
}>;

export type AppDrawerProps = {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  position?: DrawerProps['position'];
  /**
   * Optional explicit Mantine size. Prefer theme tokens + `data-viewport`
   * (`--drawer-layout-sidebar-size` / `-mobile`) when omitted.
   */
  size?: DrawerProps['size'];
  withCloseButton?: boolean;
  /** Keep panel mounted while closed (warm lazy adapters; avoid remount flash). */
  keepMounted?: boolean;
  /**
   * Override auto viewport from theme `--breakpoint-*` / `BREAKPOINTS_PX`.
   * Written as `data-viewport` for CSS token selection.
   */
  viewport?: AppDrawerViewport;
  /** CMF scope for CSS cascade on the portaled panel (`data-cmf-*`). */
  cmfComponent?: string;
  cmfKey?: string;
  className?: string;
  classNames?: AppDrawerClassNames;
};
