import React, { useCallback, useEffect, useState } from 'react';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { PersonInterface } from '../interfaces/Person';
import { getPerson } from '../utils/api/ApiFunctional';
import { IMG_URL, SWAPI_BASE_URL } from '../utils/api/API_CONSTS';
import { getRandomId } from '../utils/helpers/getRandomId';
import { KEYS } from '../utils/localStorage/STORAGE_KEYS';
import Person from './Person';
import { Preloader } from './Preloader';

const PeopleComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [person, setPerson] = useState<PersonInterface>({
    personName: '',
    img: ''
  });

  const createPerson = useCallback(
    (name: string, img: string): PersonInterface => {
      return {
        personName: name,
        img
      };
    },
    []
  );

  function getId(url: string) {
    return url.split('/')[url.split('/').length - 2];
  }

  const onPersonReceipt = useCallback(
    (res) => {
      setIsLoading(true);
      const image = `${IMG_URL}${getId(res.url)}.jpg`;
      const person = createPerson(res.name, image);
      setPerson(person);
    },
    [createPerson]
  );

  const isIdExpired = (id: string) => {
    return JSON.parse(id).day === new Date().getDate();
  };

  const isValidIdInStorage = compose(
    (id) => (id ? isIdExpired(id) : false),
    () => localStorage.getItem(KEYS.id)
  );

  useEffect(() => {
    if (isValidIdInStorage()) {
      const id = JSON.parse(localStorage.getItem(KEYS.id)!).id;
      getPerson(SWAPI_BASE_URL, id)
        .then((res) => {
          onPersonReceipt(res);
        })
        .then(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } else {
      const id = getRandomId();
      getPerson(SWAPI_BASE_URL, id)
        .then((res) => {
          onPersonReceipt(res);
          const idAndTime = {
            id: id.toString(),
            day: new Date().getDate()
          };
          localStorage.setItem(KEYS.id, JSON.stringify(idAndTime));
        })
        .then(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, []);

  return (
    <>
      <h1 className="people__title">Today You Are...</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="people">
          <Person
            key={uuidv4()}
            personName={person.personName}
            img={person.img}
          />
        </div>
      )}
    </>
  );
};

export default PeopleComponent;