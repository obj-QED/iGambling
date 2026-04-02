import { createSlice } from '@reduxjs/toolkit';

export type InformationState = {
  info: unknown;
};

const initialState: InformationState = {
  info: null,
};

const informationSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {
    setInformation: (state, action: { payload: unknown }) => {
      state.info = action.payload;
    },
  },
});

export const { setInformation } = informationSlice.actions;
export const informationReducer = informationSlice.reducer;
