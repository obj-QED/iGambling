/** Parsed menu item DTO — validated at API/config boundary only. */
export type MenuItemDto = {
  key: string;
  name: string;
  url: string;
  img?: string;
  imgShape?: string;
  imgRadius?: string;
  type?: string;
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
