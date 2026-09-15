import type { ContextModalProps } from '@mantine/modals';
import type { ComponentType } from 'react';

import { lazy } from 'react';

export const appModals = {
  search: lazy(() =>
    import('@/shared/ui/AppSearch/type/modal/SearchModalType').then((module) => ({
      default: module.SearchModalContent,
    })),
  ),
} as const satisfies Record<string, ComponentType<ContextModalProps>>;

declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof appModals;
  }
}
