import type { Words } from '@api/lobby/types';
import type { RootState } from '@store';

import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState: Words = {};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (_state, action: { payload: Words }) => {
      return action.payload;
    },
  },
});

export const { setWords } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;

export const selectWords = (state: RootState) => state.words;

export const selectWord = (key: string) => (state: RootState) =>
  state.words[key] ?? key;

export const makeSelectWordsByPrefix = (prefix: string) =>
  createSelector(selectWords, (words) =>
    Object.fromEntries(
      Object.entries(words).filter(([k]) => k.startsWith(prefix)),
    ) as Words,
  );
