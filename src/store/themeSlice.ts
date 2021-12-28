import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface ThemeState {
  isDark: boolean
};

const initialState: ThemeState = {
  isDark: true
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    }
  }
});

export const { setTheme } = themeSlice.actions;
export const isDark = (state: RootState) => state.theme.isDark;
export const themeReducer = themeSlice.reducer;

