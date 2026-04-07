import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  // Fetch persons from server on component mount
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Failed to fetch persons:', error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    if (!name) return

    if (persons.some((person) => person.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already added to phonebook`)
      return
    }

    const personObject = { name, number: newNumber }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Failed to add person:', error)
      })
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
