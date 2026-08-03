import { memo } from 'react';

import { IconPhotoMinus } from '@tabler/icons-react';

/** Tabler SVG props — stroke only; size from parent ActionIcon. */
const SIDEBAR_TABLER_ICON_PROPS = {
  stroke: 2,
} as const;

function SidebarPhotoFallbackComponent() {
  return <IconPhotoMinus {...SIDEBAR_TABLER_ICON_PROPS} aria-hidden />;
}

export const SidebarPhotoFallback = memo(SidebarPhotoFallbackComponent);
SidebarPhotoFallback.displayName = 'SidebarPhotoFallback';
