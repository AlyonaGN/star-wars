import { createStore } from 'redux';
import reducers from './combinedReducers';

const store = createStore(reducers);

export default store;
