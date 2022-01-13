import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setPerson } from '../store/peopleSlice';
import { v4 as uuidv4 } from 'uuid';
import { PersonInterface } from '../interfaces/Person';
import { getPerson } from '../utils/api/ApiFunctional';
import { IMG_URL, SWAPI_BASE_URL } from '../utils/api/API_CONSTS';
import { getRandomId } from '../utils/helpers/getRandomId';
import { KEYS } from '../utils/localStorage/STORAGE_KEYS';
import Person from './Person';
import { Preloader } from './Preloader';
import vader from '../images/vader.jpg';
import { usePersonContext } from '../contexts/PersonProvider';

const PeopleComponent: React.FC = () => {
  const person = useAppSelector(state => state.people.person);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setErr] = useState<Error>();
  const { isPersonFromStorage } = usePersonContext();

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
      dispatch(setPerson(person));
    },
    [createPerson, dispatch]
  );

  useEffect(() => {

    if (isPersonFromStorage) {
      const id = JSON.parse(localStorage.getItem(KEYS.id)!).id;
      getPerson(SWAPI_BASE_URL, id)
        .then((res) => {
          onPersonReceipt(res);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch(() => {
          dispatch(setPerson({
            personName: 'Darth Vader',
            img: vader
          }));
          setIsLoading(false);
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
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch(() => {
          dispatch(setPerson({
            personName: 'Darth Vader',
            img: vader
          }));
          setIsLoading(false);
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
