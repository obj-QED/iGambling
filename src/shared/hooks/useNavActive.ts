import type { NavActiveSource } from '@/shared/lib/menu';

import { useCallback, useRef, useSyncExternalStore } from 'react';

import { activeAttrs as buildActiveAttrs, resolveNavActive } from '@/shared/lib/menu';
import { getPathname, subscribePathname } from '@/shared/lib/routing';

const ACTIVE_ATTRS = buildActiveAttrs(true);
const INACTIVE_ATTRS = buildActiveAttrs(false);

/**
 * Active route for a menu/link item.
 * Subscribes to the pathname store but only notifies React when *this* item's
 * `isActive` boolean flips — inactive siblings do not re-render on navigation.
 */
export function useNavActive(item: NavActiveSource): {
  isActive: boolean;
  activeAttrs: ReturnType<typeof buildActiveAttrs>;
} {
  const itemRef = useRef(item);
  itemRef.current = item;

  const subscribe = useCallback((onStoreChange: () => void) => {
    let prev = resolveNavActive(itemRef.current, getPathname());
    return subscribePathname(() => {
      const next = resolveNavActive(itemRef.current, getPathname());
      if (next === prev) return;
      prev = next;
      onStoreChange();
    });
  }, []);

  const getSnapshot = useCallback(() => resolveNavActive(itemRef.current, getPathname()), []);

  const isActive = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    isActive,
    activeAttrs: isActive ? ACTIVE_ATTRS : INACTIVE_ATTRS,
  };
}
