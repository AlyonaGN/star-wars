import { combineReducers } from 'redux';
import peopleReducer from './people/reducers';
import themeReducer from './theme/reducers';

const reducers = combineReducers({
  theme: themeReducer,
  people: peopleReducer
});
export default reducers;
