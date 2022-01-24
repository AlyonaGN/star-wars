import React, { useCallback, useEffect, useState, useReducer } from 'react';
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
import FeedbackForm from "./FeedbackForm";

const PeopleComponent: React.FC = () => {
  const person = useAppSelector(state => state.people.person);
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer(isLoading => !isLoading, false);;
  const [, setErr] = useState<Error>();
  const { isPersonFromStorage } = usePersonContext();
  const [alikePeople, setAlikePeople] = useState<PersonInterface[]>([]);

  function getId(url: string) {
    return url.split('/')[url.split('/').length - 2];
  }

  const createPerson = useCallback(
    (name: string, url: string): PersonInterface => {
      return {
        personName: name,
        img: `${IMG_URL}${getId(url)}.jpg`,
      };
    },
    []
  );

  const onPersonReceipt = useCallback(
    (res) => {
      toggleLoading();
      const person = createPerson(res.name, res.url);
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
          const alikePeople = JSON.parse(localStorage.getItem('alike')!);
          setAlikePeople(alikePeople);
          setTimeout(() => {
            toggleLoading();
          }, 1000);
        })
        .catch(() => {
          dispatch(setPerson({
            personName: 'Darth Vader',
            img: vader
          }));
          toggleLoading();
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
        .catch(() => {
          dispatch(setPerson({
            personName: 'Darth Vader',
            img: vader
          }));
          toggleLoading();
        });
        const firstAlikePersonId: number = id + 1;
        getPerson(SWAPI_BASE_URL, firstAlikePersonId)
        .then((res) => {
            const firstAlikePerson: PersonInterface = createPerson(res.name, res.url);
            const secondAlikePersonId: number = firstAlikePersonId + 1;
            getPerson(SWAPI_BASE_URL, secondAlikePersonId)
              .then((res) => {
                const secondAlikePerson: PersonInterface = createPerson(res.name, res.url);
                const alikePeople = [firstAlikePerson, secondAlikePerson];
                localStorage.setItem('alike', JSON.stringify(alikePeople));
                setAlikePeople(alikePeople);
              });
          
          setTimeout(() => {
            toggleLoading();
          }, 1000);
        })
        .catch((err) => {
          console.log(`SWAPI error: ${err}`);
        });
    }
  }, []);

  return (
    <>
      <h1 className="people__title">Today You Are...</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
        <div className="people">
          <Person
            key={uuidv4()}
            personName={person.personName}
            img={person.img}
          />
        </div>
        {alikePeople.length && <div className="people">
        <h2 className="people__title">You also have something in common with...</h2>
        {alikePeople.map((person: PersonInterface) => 
          <Person
            key={uuidv4()}
            personName={person.personName}
            img={person.img}
          />)}
        </div>}
        <FeedbackForm/>
      </>
      )}
    </>
  );
};

export default PeopleComponent;
