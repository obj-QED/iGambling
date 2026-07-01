/** Tabler SVG props — size via `.glyph` + CMF `--cmf-icon-glyph-*`. Chevron: `--header-chevron-icon-size`. */
export const HEADER_TABLER_ICON_PROPS = {
  stroke: 2,
} as const;

/** Resolved CMF glyph scale (global → component → key). */
export const CMF_ICON_GLYPH_WIDTH_VAR = '--cmf-icon-glyph-width';
export const CMF_ICON_GLYPH_HEIGHT_VAR = '--cmf-icon-glyph-height';

/** Mantine size keys — defaults in `header/tokens.scss`, read via `useHeaderMenuSizes()`. */
export const HEADER_SIZE_BUTTON_VAR = '--header-size-button';
export const HEADER_SIZE_LINK_VAR = '--header-size-link';
export const HEADER_SIZE_ACTION_ICON_VAR = '--header-size-action-icon';
