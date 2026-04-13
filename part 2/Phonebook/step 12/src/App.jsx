import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import personService from './services'
import localData from './db.json'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [isOffline, setIsOffline] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
  }

  const removePerson = (name) => {
    const existing = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    )

    if (!existing) {
      showNotification(
        `The information of ${name} has already been removed from server`,
        'error'
      )
      return
    }

    setPersons((prev) => prev.filter((person) => person.name !== name))
    showNotification(`Removed ${name}`, 'success')
  }

  // Fetch persons from server on component mount; fallback to local db.json when backend is unavailable
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.warn('Backend unavailable; using local db.json persons data', error)
        setPersons(localData.persons)
        setIsOffline(true)
      })
  }, [])

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.message])

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    if (!name) return

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${name} is already added to phonebook. Replace the old number with a new one?`
      )

      if (!confirmUpdate) {
        return
      }

      const updatedPerson = { ...existingPerson, number: newNumber }

      if (isOffline) {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          )
        )
        showNotification(`Updated ${name}'s number`, 'success')
        setNewName('')
        setNewNumber('')
        return
      }

      personService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? returnedPerson : person
            )
          )
          showNotification(`Updated ${name}'s number`, 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          console.error('Failed to update person:', error)
          showNotification(
            `The information of ${name} has already been removed from server`,
            'error'
          )
        })

      return
    }

    const personObject = { name, number: newNumber }

    if (isOffline) {
      // Local-only mode (no json-server)
      setPersons(persons.concat({ ...personObject, id: Date.now().toString() }))
      showNotification(`Added ${name}`, 'success')
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${name}`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Failed to add person:', error)
        showNotification(`Failed to add ${name}`, 'error')
      })
  }

  const handleDelete = (person) => {
    const ok = window.confirm(`Delete ${person.name}?`)
    if (!ok) return

    if (isOffline) {
      removePerson(person.name)
      return
    }

    personService
      .deletePerson(person.id)
      .then(() => {
        removePerson(person.name)
      })
      .catch(error => {
        console.error('Failed to delete person:', error)
        if (error.message.includes('404')) {
          setPersons(persons.filter((p) => p.id !== person.id))
          showNotification(
            `The information of ${person.name} has already been removed from server`,
            'error'
          )
        } else {
          showNotification(`Failed to delete ${person.name}`, 'error')
        }
      })
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.trim().toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

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

      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
    </div>
  )
}

export default App
