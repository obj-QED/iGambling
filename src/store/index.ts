import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { contextReducer } from './slices/contextSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    context: contextReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
