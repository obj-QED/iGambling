import type { HeaderMenuModel } from '@/widgets/header/types';
import type { SidebarConfig } from '@/widgets/sidebar/types';

import { createStorybookSidebarMenu } from '@/storybook/data';
import { resolveSidebarConfig } from '@/widgets/sidebar/config/resolve';

export function resolveStorybookSidebarProps(): {
  menu: HeaderMenuModel;
  config: SidebarConfig;
} {
  return {
    menu: createStorybookSidebarMenu(),
    config: resolveSidebarConfig(),
  };
}
