import type { Words } from '@/api/lobby/types';
import type { RootState } from '@/store';

import { createSlice } from '@reduxjs/toolkit';

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

/** Все переводы */
export const selectWords = (state: RootState) => state.words;

/** Перевод по конкретному ключу */
export const selectWord = (key: string) => (state: RootState) =>
  state.words[key] ?? key;

/** Все ключи, начинающиеся с указанного префикса/буквы */
export const selectWordsByPrefix = (prefix: string) => (state: RootState) => {
  const words = state.words;
  return Object.fromEntries(
    Object.entries(words).filter(([k]) => k.startsWith(prefix))
  ) as Words;
};
