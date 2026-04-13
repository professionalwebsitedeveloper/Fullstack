import Header from './Header'
import Content from './Content'
import Part from './Part'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content>
        {course.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </Content>
    </div>
  )
}

export default Course