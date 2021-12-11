import { themeActionTypes } from './actions';

const initialState = {
  isDark: false
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case themeActionTypes.SET_THEME:
      return { ...state, isDark: action.payload };
    default:
      return state;
  }
};
export default themeReducer;
