import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getPeople } from '../utils/ApiFunctional';
import { SWAPI_BASE_URL } from '../utils/API_CONSTS';
import Person from './Person';

const People = () => {
  const [people, setPeople] = useState([]);
  const [chosenPerson, setChosenPerson] = useState('');
  const curryFunction = (f) => {
    return function (people) {
      return function (name) {
        return f(people, name);
      };
    };
  };

  const isPersonHere = useCallback((people, personName) => {
    return people.filter((person) => person.name === personName).length > 0;
  }, []);

  const updateChosenOne = useCallback((e) => {
    const { name } = e.target.closest('.person').dataset;
    console.log(name);
    setChosenPerson(name);
  }, []);

  useEffect(() => {
    getPeople(SWAPI_BASE_URL).then((res) => {
      console.log('res from func:', res);
      setPeople(res.results);
      const curriedFunction = curryFunction(isPersonHere);
      console.log(
        'from curried func',
        curriedFunction(res.results)('Darth Vader')
      );
    });
  }, []);

  return (
    <div className="people">
      {people.map((person) => (
        <Person
          key={uuidv4()}
          name={person.name}
          handleClick={updateChosenOne}
          chosen={person.name === chosenPerson}
        />
      ))}
    </div>
  );
};

export default People;
