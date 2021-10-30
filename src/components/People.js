import React, { useCallback, useEffect } from 'react';
import { api } from '../utils/ApiClass';
import { getPeople } from '../utils/ApiFunctional';
import { SWAPI_BASE_URL } from '../utils/API_CONSTS';

const People = () => {
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

  useEffect(() => {
    api.getPeople().then((res) => {
      console.log('res from class:', res);
    });
    getPeople(SWAPI_BASE_URL).then((res) => {
      console.log('res from func:', res);
      const curriedFunction = curryFunction(isPersonHere);
      console.log(
        'from curried func',
        curriedFunction(res.results)('Darth Vader')
      );
    });
  }, []);

  return <div className="people"></div>;
};

export default People;
