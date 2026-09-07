import type { NavActiveTreeNode } from '@/shared/lib/menu';

import { useCallback, useRef, useSyncExternalStore } from 'react';

import { hasActiveNavDescendant } from '@/shared/lib/menu';
import { getPathname, subscribePathname } from '@/shared/lib/routing';

/**
 * Whether any nested menu descendant is route-active.
 * Subscribes to pathname but only re-renders when the boolean flips.
 */
export function useHasActiveNavDescendant(
  items: readonly NavActiveTreeNode[] | undefined,
): boolean {
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const subscribe = useCallback((onStoreChange: () => void) => {
    let prev = hasActiveNavDescendant(itemsRef.current, getPathname());
    return subscribePathname(() => {
      const next = hasActiveNavDescendant(itemsRef.current, getPathname());
      if (next === prev) return;
      prev = next;
      onStoreChange();
    });
  }, []);

  const getSnapshot = useCallback(
    () => hasActiveNavDescendant(itemsRef.current, getPathname()),
    [],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
