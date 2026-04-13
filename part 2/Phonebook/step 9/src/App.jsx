import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services";
import localData from "./db.json";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((data) => setPersons(data))
      .catch((error) => {
        console.warn("Backend unavailable; using local db.json data", error);
        setPersons(localData.persons);
      });
  }, []);

  const handleChangeName = (event) => setNewName(event.target.value);
  const handleChangeNumber = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const name = newName.trim();
    if (!name) {
      window.alert("Please enter a name");
      return;
    }

    const exists = persons.some((p) => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      window.alert(`${name} is already added to phonebook`);
      return;
    }

    const newPerson = { name, number: newNumber };

    personsService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons((prev) => [...prev, returnedPerson]);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Failed to add person:", error);
        window.alert(`Failed to add ${name}. Make sure the server is running (npm run server)`);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.error("Failed to delete person:", error);
          window.alert(`Failed to delete ${name}. Make sure the server is running.`);
        });
    }
  };

  const filteredPersons = persons.filter((person) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return person.name.toLowerCase().includes(term);
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleChangeName}
        onNumberChange={handleChangeNumber}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;