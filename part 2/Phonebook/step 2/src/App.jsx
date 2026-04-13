import { useState } from "react";

function App() {
  const [newName, setNewName] = useState("Martin Fowler");
  const [numbers, setNumbers] = useState([
    { name: "Arto Hellas", number: "some-number" },
    { name: "Ada Lovelace", number: "some-number" },
  ]);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Check if the name already exists (string equality on the name field)
    const exists = numbers.some((person) => person.name === newName);

    if (exists) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    setNumbers((prev) => [
      ...prev,
      { name: newName, number: "some-number" },
    ]);

    setNewName("");
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
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      <ul>
        {numbers.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;