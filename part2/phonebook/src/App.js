import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = (event) => {
    const filterString = event.target.value
    setFilter(filterString)
  
    if (filterString === '') {
      setPersonsToShow(persons);
    } else {
      const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
      setPersonsToShow(filteredPersons)
    }
    
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      const personObject = { name: newName, number: newNumber }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input
          value={filter}
          onChange={filterPersons}
        />
      </div>
      <h2>Add new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</div>
    </div>
  )
}

export default App
