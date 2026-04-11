export type Block = {
  type: string;
  [key: string]: unknown;
};

export type PageInfo = {
  content?: string;
  [key: string]: unknown;
};

export type PageData = {
  blocks?: Block[];
  info?: PageInfo;
  menu?: unknown[];
  [key: string]: unknown;
};
