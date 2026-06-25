import type { CmfActionIconSize } from '@/assets/theme/mantine/cmfActionIconVars';
import type { CmfButtonSize } from '@/assets/theme/mantine/cmfButtonVars';

/** Square header controls — 2.25rem, matches `HEADER_MENU_BUTTON_SIZE`. */
export const HEADER_MENU_ACTION_ICON_SIZE: CmfActionIconSize = 'input-sm';

/** Text buttons / dropdown triggers — same row height as ActionIcon. */
export const HEADER_MENU_BUTTON_SIZE: CmfButtonSize = 'sm';

/** Mantine Menu panel scope — pairs with `HEADER_MENU_DROPDOWN_BUTTON_SCOPE` for CMF tokens. */
export const HEADER_MENU_SCOPE = 'header' as const;

/** CMF button token scope for dropdown rows (`cmf-button-scope-bridge`). */
export const HEADER_MENU_DROPDOWN_BUTTON_SCOPE = 'header-dropdown' as const;

export const HEADER_TABLER_ICON_PROPS = {
  stroke: 2,
} as const;
