import type { SidebarSchema } from './config.types';
import type { ReactNode } from 'react';

export type SidebarConfigProviderProps = {
  config: SidebarSchema;
  children: ReactNode;
};

export type SidebarDropdownProviderProps = {
  /** Open on first visit when localStorage is empty (`aside.openedDropdowns`). */
  defaultOpenKeys: readonly string[];
  children: ReactNode;
};
