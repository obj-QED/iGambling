import type { BreakpointName } from '@/assets/theme/breakpoints';
import type { DrawerSettings } from '@/shared/config';
import type { CmfControlAttrs } from '@/shared/lib/cmf';
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
  title: string;
  close: string;
  body: string;
  overlay: string;
}>;

export type AppDrawerProps = {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  position?: DrawerProps['position'];
  /**
   * Optional explicit Mantine size. When omitted, theme/CSS owns width
   * (`--cmf-drawer-layout-sidebar-size` → `--app-layout-sidebar-width`).
   * Sidebar chrome passes a CSS `var(...)` so Mantine does not fall back to `--drawer-size-md`.
   */
  size?: DrawerProps['size'];
  withCloseButton?: boolean;
  /** Keep panel mounted while closed (warm lazy adapters; avoid remount flash). */
  keepMounted?: boolean;
  /**
   * Widget / place defaults (e.g. `aside.drawer`). Cascade:
   * `params.drawer` → `defaults` → instance props.
   */
  defaults?: DrawerSettings;
  /**
   * Override auto viewport from theme `--breakpoint-*` / `BREAKPOINTS_PX`.
   * Written as `data-viewport` for CSS token selection.
   */
  viewport?: AppDrawerViewport;
  className?: string;
  classNames?: AppDrawerClassNames;
} & CmfControlAttrs &
  Omit<DrawerSettings, 'title' | 'classNames' | 'className'>;
