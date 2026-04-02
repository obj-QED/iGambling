import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { wordsReducer } from './slices/wordsSlice';

export const store = configureStore({
  reducer: {
    application: authReducer,
    words: wordsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
