/** Parsed menu item DTO — validated at API/config boundary only. */
export type MenuItemApiType = 'button' | 'link';

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
