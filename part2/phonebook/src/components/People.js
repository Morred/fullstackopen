import Person from './Person'

const People = ({ people }) => {
    return (
        <div>{people.map(person => <Person key={person.name} person={person}/>)}</div>
    )
}

export default People
