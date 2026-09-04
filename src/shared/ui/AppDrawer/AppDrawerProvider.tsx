import type { ReactNode } from 'react';

import { AppDrawerContext } from './lib/appDrawerContext';
import { useAppDrawer } from './lib/useAppDrawer';

type AppDrawerProviderProps = {
  children: ReactNode;
  initialOpened?: boolean;
};

export function AppDrawerProvider({ children, initialOpened }: AppDrawerProviderProps) {
  const drawer = useAppDrawer(initialOpened);

  return <AppDrawerContext.Provider value={drawer}>{children}</AppDrawerContext.Provider>;
}
