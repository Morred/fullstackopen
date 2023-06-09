import Person from './Person'

const People = ({ people, deletePersonHandler }) => {
    return (
        <div>{people.map(person => <Person key={person.name} person={person} deletePersonHandler={deletePersonHandler}/>)}</div>
    )
}

export default People
