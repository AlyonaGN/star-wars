import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonInterface } from '../interfaces/Person';
import type { RootState } from './index';

interface PeopleState {
  person: PersonInterface
};

const initialState: PeopleState = {
  person: { personName: '', img: '' }
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<PersonInterface>) => {
      state.person = action.payload
    }
  }
});

export const { setPerson } = peopleSlice.actions;
export const person = (state: RootState) => state.people.person;
export const peopleReducer = peopleSlice.reducer;

