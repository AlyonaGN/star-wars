export const themeActionTypes = {
  SET_THEME: 'THEME.SET_THEME'
};

export const themeActions = {
  setTheme: (payload) => {
    return { type: themeActionTypes.SET_THEME, payload };
  }
};
