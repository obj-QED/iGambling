/** Parsed menu item DTO — validated at API/config boundary only. */
export type MenuItemApiType = 'button' | 'link';

/**
 * Mark when the row label is unavailable (compact ActionIcon / slideout rail).
 * Omit → default chain: `img` → `glyph` (known key) → `initial`.
 */
export type MenuItemRailMedia = 'img' | 'initial' | 'glyph';

export type MenuItemDto = {
  key: string;
  name: string;
  url: string;
  img?: string;
  imgShape?: string;
  imgRadius?: string;
  type?: MenuItemApiType | string;
  /** Control visual variant override (`filled`, `light`, …); wins over `type` in UI resolvers. */
  variant?: string;
  /** Optional tooltip / a11y copy. Tooltip content may include HTML. */
  label?: string;
  /** Sidebar logo rail — show burger/menu trigger next to the mark. */
  menuIcon?: boolean;
  /**
   * Compact + slideout-collapsed mark override.
   * Use when the default img→initial→glyph chain is wrong for this item
   * (e.g. account prefers `glyph` over avatar `img` on the rail).
   */
  railMedia?: MenuItemRailMedia;
  badge?: string | number;
  subtitle?: string;
  items?: MenuItemDto[];
};

/** Parsed menu root entry (`key: header | footer | left`, …). */
export type MenuRootDto = {
  key: string;
  name: string;
  url: string;
  items: MenuItemDto[];
};
