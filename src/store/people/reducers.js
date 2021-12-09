import { peopleActionTypes } from './actions';

const initialState = {
  person: { personName: '', img: '' }
};

const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case peopleActionTypes.SET_PERSON:
      return { ...state, person: action.payload };
    default:
      return state;
  }
};
export default peopleReducer;
