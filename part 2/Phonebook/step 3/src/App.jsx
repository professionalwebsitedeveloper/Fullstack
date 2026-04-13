import { useState } from "react";

function App() {
  const [newName, setNewName] = useState("Martin Fowler");
  const [newNumber, setNewNumber] = useState("");
  const [numbers, setNumbers] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "050-9876543" },
  ]);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const exists = numbers.some((person) => person.name === newName);

    if (exists) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    setNumbers((prev) => [
      ...prev,
      { name: newName, number: newNumber },
    ]);

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: name - {newName}, number - {newNumber}</div>

      <h2>Numbers</h2>
      <ul>
        {numbers.map((p, i) => (
          <li key={i}>{p.name} - {p.number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;