import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

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

      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAddName={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App