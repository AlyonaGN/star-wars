import React, { createContext, useState, useContext } from 'react';
import { compose } from 'redux';
import { KEYS } from '../utils/localStorage/STORAGE_KEYS';
import { ChildrenProps } from '../interfaces/ReactNodesChildren';

type IsPersonFromStorageType = boolean;

interface PersonContextInterface {
  isPersonFromStorage: IsPersonFromStorageType;
  setIsPersonFromStorage: React.Dispatch<React.SetStateAction<IsPersonFromStorageType>>;
}

const PersonContext = createContext<PersonContextInterface>({} as PersonContextInterface);
export const usePersonContext = () => useContext(PersonContext);

export default function PersonProvider({ children }: ChildrenProps) {
  const isIdExpired = (id: string) => {
    return JSON.parse(id).day === new Date().getDate();
  };

  const isValidIdInStorage = compose(
    (id) => (id ? isIdExpired(id) : false),
    () => localStorage.getItem(KEYS.id)
  );
  const [isPersonFromStorage, setIsPersonFromStorage] = useState<boolean>(
    isValidIdInStorage()
  );

  return (
    <PersonContext.Provider value={{ isPersonFromStorage, setIsPersonFromStorage }}>
      {children}
    </PersonContext.Provider>
  );
}
