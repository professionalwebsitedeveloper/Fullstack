import Person from './Person'

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button
            type="button"
            onClick={() => onDelete(person)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons