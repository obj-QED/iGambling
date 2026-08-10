import type { WrapperMode } from '@/shared/schema';
import type { ComponentType } from 'react';

import { lazy, useMemo } from 'react';

import { type OverlayTargetProps, resolveWrapperLoader } from '@/shared/ui/overlay';

export function useWrapper(mode: WrapperMode | undefined): ComponentType<OverlayTargetProps> {
  return useMemo(() => {
    const loader = resolveWrapperLoader(mode);
    return lazy(loader);
  }, [mode]);
}
