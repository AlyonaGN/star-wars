import React, { useCallback, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { PersonInterface } from '../interfaces/Person';
import { getPerson } from '../utils/api/ApiFunctional';
import { IMG_URL, SWAPI_BASE_URL } from '../utils/api/API_CONSTS';
import { getRandomId } from '../utils/helpers/getRandomId';
import { KEYS } from '../utils/localStorage/STORAGE_KEYS';
import Person from './Person';
import { Preloader } from './Preloader';
import { peopleActions } from '../store/people/actions';
import vader from '../images/vader.jpg';

interface PeopleProps {
  person: PersonInterface;
  setPerson: (person: PersonInterface) => void;
}

const PeopleComponent: React.FC<PeopleProps> = ({ person, setPerson }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setErr] = useState<Error>();
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
    [createPerson, setPerson]
  );

  const isIdExpired = (id: string) => {
    return JSON.parse(id).day === new Date().getDate();
  };

  const isValidIdInStorage = compose(
    (id) => (id ? isIdExpired(id) : false),
    () => localStorage.getItem(KEYS.id)
  );

  useEffect(() => {
    setPerson({
      personName: 'Darth Vader',
      img: vader
    });
    setIsLoading(false);
    /*  if (isValidIdInStorage()) {
      const id = JSON.parse(localStorage.getItem(KEYS.id)!).id;
      getPerson(SWAPI_BASE_URL, id)
        .then((res) => {
          onPersonReceipt(res);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch(() => {
          setPerson({
            personName: 'Darth Vader',
            img: vader
          });
          setIsLoading(false);
          setErr(() => {
            throw new Error('Couldn`t load person from swapi');
          });
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
          setPerson({
            personName: 'Darth Vader',
            img: vader
          });
          setIsLoading(false);
          setErr(() => {
            throw new Error('Couldn`t load person from swapi');
          });
        });
    } */
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

const mapStateToProps = (state: { people: { person: PersonInterface } }) => ({
  person: state.people.person
});

const mapDispatchToProps = (dispatch: any) => ({
  setPerson: (person: PersonInterface) =>
    dispatch(peopleActions.setPerson(person))
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleComponent);
