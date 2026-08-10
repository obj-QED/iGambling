import { useSyncExternalStore } from 'react';

import { getPathname, subscribePathname } from '@/shared/lib/routing';

/** Pathname from shared store — prefer for boolean snapshots; string changes every nav. */
export function usePathname(): string {
  return useSyncExternalStore(subscribePathname, getPathname, getPathname);
}
