import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    if (!name) return

    if (persons.some((person) => person.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already added to phonebook`)
      return
    }

    const nextId =
      persons.length > 0 ? Math.max(...persons.map((person) => person.id)) + 1 : 1

    const person = { name, number: newNumber, id: nextId }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.trim().toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with{' '}
        <input
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
        />
      </div>

      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App