import { createSlice } from '@reduxjs/toolkit';

export type BuilderState = {
  content: unknown;
  menus: unknown;
};

const initialState: BuilderState = {
  content: null,
  menus: null,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBuilder: (
      state,
      action: {
        payload: {
          content?: unknown;
          menu?: unknown;
          slider?: unknown;
        };
      },
    ) => {
      const { content, menu } = action.payload;
      if (content !== undefined) state.content = content;
      if (menu !== undefined) state.menus = menu;
    },
  },
});

export const { setBuilder } = builderSlice.actions;
export const builderReducer = builderSlice.reducer;
