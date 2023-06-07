const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((a, b) => a + b);
  return <p><b>Total of {sum} exercises</b></p>
}

const Part = ({ part }) => 
  <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part}/>
      })}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  )
}

export default Course