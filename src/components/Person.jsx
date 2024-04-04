const Person = ({ person, deletePerson }) => {
  return (
    <li>
      <p className="p-width">{person.name}</p>
      <p className="p-width-number">{person.number}</p>
      <button className="delete-button" onClick={deletePerson}>
        delete
      </button>
    </li>
  );
};

export default Person;
