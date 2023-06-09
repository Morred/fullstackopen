const Person = ({ person, deletePersonHandler }) => {
  return (
    <div>
      <span key={person.name}> {person.name} {person.number} </span>
      <button onClick={() => deletePersonHandler(person.id)}>delete</button>
    </div>
  )
}

export default Person
