export const peopleActionTypes = {
  SET_PERSON: 'PEOPLE.SET_PERSON'
};

export const peopleActions = {
  setPerson: (payload) => {
    return { type: peopleActionTypes.SET_PERSON, payload };
  }
};
