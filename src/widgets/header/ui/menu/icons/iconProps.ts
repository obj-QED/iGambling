import type { CmfActionIconSize } from '@/assets/theme/mantine/cmfActionIconVars';
import type { CmfButtonSize } from '@/assets/theme/mantine/cmfButtonVars';

/**
 * Header menu Mantine size keys — dimensions come from `--header-menu-control-height`
 * (bridged to CMF on header `.root` in `header-control-tokens`).
 */
export const HEADER_MENU_ACTION_ICON_SIZE: CmfActionIconSize = 'input-sm';

/** Text buttons / dropdown triggers — same row height as ActionIcon. */
export const HEADER_MENU_BUTTON_SIZE: CmfButtonSize = 'sm';

/** Mantine Menu panel scope — pairs with `HEADER_MENU_DROPDOWN_BUTTON_SCOPE` for CMF tokens. */
export const HEADER_MENU_SCOPE = 'header' as const;

/** CMF button token scope for dropdown rows (`cmf-button-scope-bridge`). */
export const HEADER_MENU_DROPDOWN_BUTTON_SCOPE = 'header-dropdown' as const;

/** Tabler SVG props — size via `.glyph` + `--header-menu-icon-width/height` (default 50%). Chevron: `--header-chevron-icon-size`. */
export const HEADER_TABLER_ICON_PROPS = {
  stroke: 2,
} as const;

/** Theme CSS variables for header menu icon dimensions (not chevron). */
export const HEADER_MENU_ICON_WIDTH_VAR = '--header-menu-icon-width';
export const HEADER_MENU_ICON_HEIGHT_VAR = '--header-menu-icon-height';
