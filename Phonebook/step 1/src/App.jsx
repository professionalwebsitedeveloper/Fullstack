import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    if (!name) return


    const nextId = persons.length > 0 ? Math.max(...persons.map((person) => person.id)) + 1 : 1
    const person = { name, id: nextId }
    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name}
        </div>
      ))}
    </div>
  )
}

export default App