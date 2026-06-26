/** Parsed `page.menu` item — validated at API/config boundary only. */
export type PageMenuItemType = 'button' | 'link';

export type PageMenuItemDto = {
  key: string;
  name: string;
  url: string;
  img?: string;
  type?: PageMenuItemType;
  items?: PageMenuItemDto[];
};

/** Parsed `page.menu` root entry (`key: header | footer | left`, …). */
export type PageMenuRootDto = {
  key: string;
  name: string;
  url: string;
  items: PageMenuItemDto[];
};
