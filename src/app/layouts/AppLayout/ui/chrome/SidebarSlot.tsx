import { memo, useEffect } from 'react';

import { useAppDrawerContext } from '@/shared/ui';

import {
  SIDEBAR_CHROME_REGISTRY,
  type SidebarChromeKey,
  type SidebarChromeProps,
} from './sidebarChromeRegistry';

type SidebarSlotProps = SidebarChromeProps & {
  chrome: SidebarChromeKey;
};

export const SidebarSlot = memo(function SidebarSlot({ chrome, ...props }: SidebarSlotProps) {
  const { close } = useAppDrawerContext();

  useEffect(() => {
    if (chrome === 'rail') {
      close();
    }
  }, [chrome, close]);

  const Chrome = SIDEBAR_CHROME_REGISTRY[chrome];
  return <Chrome {...props} />;
});
SidebarSlot.displayName = 'SidebarSlot';
