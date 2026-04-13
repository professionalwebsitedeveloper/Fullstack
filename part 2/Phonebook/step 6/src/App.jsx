import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("Martin Fowler");
  const [newNumber, setNewNumber] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeName = (event) => setNewName(event.target.value);
  const handleChangeNumber = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const exists = persons.some((p) => p.name === newName);
    if (exists) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const newId =
      persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1;

    setPersons((prev) => [
      ...prev,
      { name: newName, number: newNumber, id: newId },
    ]);

    setNewName("");
    setNewNumber("");
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

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;