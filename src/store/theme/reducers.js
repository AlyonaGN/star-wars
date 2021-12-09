import { themeActionTypes } from './actions';

const initialState = {
  theme: 'dark'
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case themeActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};
export default themeReducer;
