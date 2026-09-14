import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export type AppSearchPageMode = 'idle' | 'input';

export type AppSearchSchemaState = {
  type: string;
  style: string;
};

export type AppSearchContextState = {
  schema: AppSearchSchemaState;
  query: string;
  modalOpen: boolean;
  modalId?: string;
  pageMode: AppSearchPageMode;
};

/** Component UI contexts keyed by name — `state.context.<component>`. */
export type ContextState = {
  appSearch: AppSearchContextState;
};

const initialAppSearch: AppSearchContextState = {
  schema: { type: 'modal', style: 'input' },
  query: '',
  modalOpen: false,
  modalId: undefined,
  pageMode: 'idle',
};

const initialState: ContextState = {
  appSearch: initialAppSearch,
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setAppSearchSchema(state, action: PayloadAction<AppSearchSchemaState>) {
      state.appSearch.schema = action.payload;
    },
    setAppSearchQuery(state, action: PayloadAction<string>) {
      state.appSearch.query = action.payload;
    },
    setAppSearchModalOpen(state, action: PayloadAction<{ open: boolean; modalId?: string }>) {
      state.appSearch.modalOpen = action.payload.open;
      state.appSearch.modalId = action.payload.open ? action.payload.modalId : undefined;
    },
    setAppSearchPageMode(state, action: PayloadAction<AppSearchPageMode>) {
      state.appSearch.pageMode = action.payload;
    },
    resetAppSearchInput(state) {
      state.appSearch.pageMode = 'idle';
      state.appSearch.query = '';
    },
  },
});

export const {
  setAppSearchSchema,
  setAppSearchQuery,
  setAppSearchModalOpen,
  setAppSearchPageMode,
  resetAppSearchInput,
} = contextSlice.actions;

export const contextReducer = contextSlice.reducer;

export const selectAppSearchContext = (state: { context: ContextState }) => state.context.appSearch;
export const selectAppSearchQuery = (state: { context: ContextState }) =>
  state.context.appSearch.query;
export const selectAppSearchModalOpen = (state: { context: ContextState }) =>
  state.context.appSearch.modalOpen;
export const selectAppSearchPageMode = (state: { context: ContextState }) =>
  state.context.appSearch.pageMode;
export const selectAppSearchSchema = (state: { context: ContextState }) =>
  state.context.appSearch.schema;
