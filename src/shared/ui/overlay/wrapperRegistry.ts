import type { OverlayTargetProps } from './types';
import type { WrapperMode } from '@/shared/schema';
import type { ComponentType } from 'react';

export type WrapperLoader = () => Promise<{ default: ComponentType<OverlayTargetProps> }>;

/** Sync registry of lazy loaders — selected mode only is imported. */
export const WRAPPER_REGISTRY = {
  popover: () => import('./PopoverWrapper'),
  drawer: () => import('./DrawerWrapper'),
  tooltip: () => import('./TooltipWrapper'),
  modal: () => import('./ModalWrapper'),
  none: () => import('./FragmentPassThrough'),
} as const satisfies Record<WrapperMode, WrapperLoader>;

export function resolveWrapperLoader(mode: WrapperMode | undefined): WrapperLoader {
  if (mode && Object.hasOwn(WRAPPER_REGISTRY, mode)) {
    return WRAPPER_REGISTRY[mode];
  }
  return WRAPPER_REGISTRY.none;
}
