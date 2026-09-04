import type { AppDrawerState } from '../types/drawerState.types';

import { createContext } from 'react';

export const AppDrawerContext = createContext<AppDrawerState | null>(null);

/** Soft fallback when provider is missing (Storybook / isolated blocks). */
export const APP_DRAWER_FALLBACK: AppDrawerState = {
  opened: false,
  open: () => undefined,
  close: () => undefined,
  toggle: () => undefined,
};
