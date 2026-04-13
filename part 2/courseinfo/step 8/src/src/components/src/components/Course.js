// Course.js
import Header from './Header'
import Content from './Content'
import Part from './Part'

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)

  return (
    <div>
      <Header course={course} />
      <Content>
        {course.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}

        <p><strong>Total exercises: {total}</strong></p>
      </Content>
    </div>
  )
}

export default Course