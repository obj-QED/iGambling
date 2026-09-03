import type { ReactNode } from 'react';

import { useCallback, useMemo, useState } from 'react';

import { SidebarDrawerContext } from './sidebarDrawerContext';

type SidebarDrawerProviderProps = {
  children: ReactNode;
};

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const [opened, setOpened] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      opened,
      open,
      close,
      toggle,
    }),
    [opened, open, close, toggle],
  );

  return <SidebarDrawerContext.Provider value={value}>{children}</SidebarDrawerContext.Provider>;
}
