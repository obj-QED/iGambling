import type { MenuActiveSource } from '@/shared/lib/menu';

import { useLocation } from 'react-router-dom';

import { menuActiveAttrs, resolveMenuActive } from '@/shared/lib/menu';

export function useMenuActive(item: MenuActiveSource): {
  isActive: boolean;
  menuActiveAttrs: ReturnType<typeof menuActiveAttrs>;
} {
  const { pathname } = useLocation();
  const isActive = resolveMenuActive(item, pathname);

  return {
    isActive,
    menuActiveAttrs: menuActiveAttrs(isActive),
  };
}
