import { configureStore } from '@reduxjs/toolkit';
import { peopleReducer } from './peopleSlice';
import { themeReducer } from './themeSlice';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    theme: themeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
