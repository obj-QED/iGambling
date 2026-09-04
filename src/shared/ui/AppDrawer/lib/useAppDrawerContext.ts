import type { AppDrawerState } from '../types/drawerState.types';

import { useContext } from 'react';

import { APP_DRAWER_FALLBACK, AppDrawerContext } from './appDrawerContext';

/** Reads shared drawer state from the nearest `AppDrawerProvider`. */
export function useAppDrawerContext(): AppDrawerState {
  return useContext(AppDrawerContext) ?? APP_DRAWER_FALLBACK;
}
