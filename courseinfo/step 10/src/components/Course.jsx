const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
