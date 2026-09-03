import { createContext } from 'react';

export type SidebarDrawerContextValue = {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const SidebarDrawerContext = createContext<SidebarDrawerContextValue | null>(null);

export const SIDEBAR_DRAWER_FALLBACK: SidebarDrawerContextValue = {
  opened: false,
  open: () => undefined,
  close: () => undefined,
  toggle: () => undefined,
};
