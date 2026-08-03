import type { HeaderConfig } from '@/widgets/header/types';
import type { HeaderMenuModel } from '@/widgets/header/types';

import { createStorybookHeaderMenu } from '@/storybook/data';
import { resolveHeaderConfig } from '@/widgets/header/config/resolve';

export function resolveStorybookHeaderProps(): {
  menu: HeaderMenuModel;
  config: HeaderConfig;
} {
  return {
    menu: createStorybookHeaderMenu(),
    config: resolveHeaderConfig(),
  };
}
