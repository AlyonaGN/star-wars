const Person = ({ name, handleClick, chosen }) => {
  return (
    <div
      data-name={name}
      className={chosen ? 'person person_active' : 'person'}
      onClick={handleClick}
    >
      <span className="person__name">{name}</span>
    </div>
  );
};

export default Person;
