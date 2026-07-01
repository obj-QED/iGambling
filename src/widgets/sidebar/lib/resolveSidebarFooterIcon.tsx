import type { HeaderMenuItem } from '@/widgets/header';
import type { TablerIcon } from '@tabler/icons-react';

import { IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';

const FOOTER_ICON_BY_KEY: Record<string, TablerIcon> = {
  change_account: IconSwitchHorizontal,
  switch_account: IconSwitchHorizontal,
  logout: IconLogout,
};

export function resolveSidebarFooterIcon(item: HeaderMenuItem): TablerIcon | null {
  const key = item.key ?? '';
  return FOOTER_ICON_BY_KEY[key] ?? null;
}
