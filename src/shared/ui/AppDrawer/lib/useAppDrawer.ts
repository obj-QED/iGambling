import type { AppDrawerState } from '../types/drawerState.types';

import { useCallback, useMemo, useState } from 'react';

export function useAppDrawer(initialOpened = false): AppDrawerState {
  const [opened, setOpened] = useState(initialOpened);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return useMemo(
    () => ({
      opened,
      open,
      close,
      toggle,
    }),
    [opened, open, close, toggle],
  );
}
