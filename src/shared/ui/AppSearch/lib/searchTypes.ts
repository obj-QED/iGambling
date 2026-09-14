export type SearchOpenMode = 'modal' | 'spotlight';

export type SearchPageMode = 'idle' | 'input';

export type SearchState = {
  query: string;
  modalOpen: boolean;
  /** When `input`, non-empty query swaps main page content. */
  pageMode: SearchPageMode;
};
