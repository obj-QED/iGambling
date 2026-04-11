export type MenuItem = {
  key: string;
  name: string;
  url: string;
  img?: string;
};

export type MenuHeaderBlock = {
  type: 'menuHeaderTop';
  buttonSearch?: string;
  menu: MenuItem[];
};
