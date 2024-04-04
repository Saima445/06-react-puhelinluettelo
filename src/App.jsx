import { useState, useEffect } from "react";
import "./Reset.css";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmed = window.confirm(`Delete ${person.name} ?`);

    if (confirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          setPopupMessage(`${person.name} was succesfully deleted`);
          setIsError(false);
          setTimeout(() => {
            setPopupMessage(null);
          }, 4000);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("error deleting a person", error);
          setPopupMessage(
            `${person.name} has already been removed from server`
          );
          setIsError(true);
          setTimeout(() => {
            setPopupMessage(null);
          }, 4000);
          setPersons(persons.filter((person) => person.id !== id));
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
            setPopupMessage(`${existingPerson.name} was succesfully updated`);
            setIsError(false);
            setTimeout(() => {
              setPopupMessage(null);
            }, 4000);
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setPopupMessage(
              `${existingPerson.name} has already been removed from server, couldn't update information`
            );
            setIsError(true);
            setTimeout(() => {
              setPopupMessage(null);
            }, 4000);
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
          setPopupMessage(`${newName} was succesfully added`);
          setIsError(false);
          setTimeout(() => {
            setPopupMessage(null);
          }, 4000);
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setPopupMessage(`${newName} has already been added to server`);
          setIsError(true);
          setTimeout(() => {
            setPopupMessage(null);
          }, 4000);
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
      <Notification message={popupMessage} isError={isError} />
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
