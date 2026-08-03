import type { SidebarConfig } from './config.types';
import type { ReactNode } from 'react';

export type SidebarConfigProviderProps = {
  config: SidebarConfig;
  children: ReactNode;
};

export type SidebarDropdownProviderProps = {
  /** Open on first visit when localStorage is empty (`aside.openedDropdowns`). */
  defaultOpenKeys: readonly string[];
  children: ReactNode;
};
