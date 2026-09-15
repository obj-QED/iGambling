/** UI-ready navigation model shared by application chrome widgets. */
export type MenuItem = {
  key?: string;
  url?: string;
  name?: string;
  label?: string;
  menuIcon?: boolean;
  img?: string;
  imgShape?: string;
  imgRadius?: string;
  type?: string;
  variant?: string;
  badge?: string | number;
  subtitle?: string;
  active?: boolean;
  matchRoute?: boolean;
  activeMatch?: 'exact' | 'prefix';
  items?: MenuItem[];
};

export type MenuSection = { key: string; items: MenuItem[] };
export type MenuModel = { sections: MenuSection[] };
