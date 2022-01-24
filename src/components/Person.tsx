import React, { memo } from 'react';

interface PersonProps {
  personName: string;
  img: string;
}

const Person: React.FC<PersonProps> = ({ personName, img }: PersonProps)  => {
  console.log('rendered', personName);
  return (
    <div
      data-personname={personName}
      className="person"
    >
      <img className="person__img" src={img} alt='character-pic' />
      <h2 className="person__name">{personName}</h2>
      
    </div>
  );
};

const PurePerson = memo(
  Person,
  (prevProps, nextProps) => prevProps.personName === nextProps.personName
);

export default PurePerson;
