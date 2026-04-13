import Part from './Part'

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  )

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </ul>

      <p>
        <b>Total of {totalExercises} exercises</b>
      </p>
    </div>
  )
}

export default Course