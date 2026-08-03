import type { NavActiveSource } from '@/shared/lib/menu';

import { useLocation } from 'react-router-dom';

import { activeAttrs as buildActiveAttrs, resolveNavActive } from '@/shared/lib/menu';

export function useNavActive(item: NavActiveSource): {
  isActive: boolean;
  activeAttrs: ReturnType<typeof buildActiveAttrs>;
} {
  const { pathname } = useLocation();
  const isActive = resolveNavActive(item, pathname);

  return {
    isActive,
    activeAttrs: buildActiveAttrs(isActive),
  };
}
