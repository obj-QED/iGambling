import type { HeaderConfig } from '@/widgets/header/types';
import type { ReactNode } from 'react';

import { resolveHeaderConfig } from '@/widgets/header/config/resolve';
import { ConfigProvider } from '@/widgets/header/context/provider';

import '@/widgets/header/registry/registerBlocks';

type HeaderMenuControlsShellProps = {
  children: ReactNode;
  /** Deep-merge on top of `resolveHeaderConfig()` (e.g. `blockVariants`). */
  configPatch?: Partial<HeaderConfig>;
};

/** Config + block registry for isolated header menu control demos. */
export function HeaderMenuControlsShell({ children, configPatch }: HeaderMenuControlsShellProps) {
  const base = resolveHeaderConfig();
  const config: HeaderConfig = {
    ...base,
    ...configPatch,
    blockVariants: {
      ...base.blockVariants,
      ...configPatch?.blockVariants,
    },
    tooltip: configPatch?.tooltip ?? base.tooltip,
  };

  return <ConfigProvider config={config}>{children}</ConfigProvider>;
}
