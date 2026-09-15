import type { WrapperMode } from '@/shared/schema';
import type { ComponentType } from 'react';

import { useMemo } from 'react';

import { type OverlayTargetProps, resolveWrapperLoader } from '@/shared/ui/overlay';

import { getLazyAdapter } from './lazyAdapter';

export function useWrapper(mode: WrapperMode | undefined): ComponentType<OverlayTargetProps> {
  return useMemo(() => {
    const loader = resolveWrapperLoader(mode);
    return getLazyAdapter(loader);
  }, [mode]);
}

/** Warm the selected overlay only — not every WRAPPER_REGISTRY entry. */
export function preloadWrapper(mode: WrapperMode | undefined): void {
  if (!mode || mode === 'none') return;
  void resolveWrapperLoader(mode)();
}
