import { useState, useEffect } from "react";
import axios from "axios";
import "./Reset.css";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  // const updatePerson = (id) => {
  //   const person = persons.find((p) => p.id === id);
  //   const confirmed = window.confirm(
  //     `${person.name} is already added to phonebook, replace the old number with a new one?`
  //   );
  //   const changedPerson = { ...person };

  //   if (confirmed) {
  //     personService.update(id, changedPerson).then((returnedPerson) => {
  //       setPersons(
  //         persons.map((person) => (person.id !== id ? person : returnedPerson))
  //       );
  //     });
  //     setPersons(persons.filter((p) => p.id !== id));
  //   }
  // };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmed = window.confirm(`Delete ${person.name} ?`);

    if (confirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(
            `the person '${person.name}' was already deleted from server`,
            error
          );
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmed = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={searchValue} onChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </>
  );
};

export default App;
