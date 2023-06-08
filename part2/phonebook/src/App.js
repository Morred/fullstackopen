import axios from 'axios'
import { useState, useEffect } from 'react'
import AddNewPersonForm from './components/AddNewPersonForm'
import Filter from './components/Filter'
import People from './components/People'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }, [])

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
      const newPersonList = persons.concat(personObject)
      setPersons(newPersonList)
      setNewName('')
      setNewNumber('')

      // Reset filter so new person shows up
      setFilter('')
      setPersonsToShow(newPersonList)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={filterPersons}/>
      <h2>Add new person</h2>
      <AddNewPersonForm
        name={newName}
        number={newNumber}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <People people={personsToShow}/>
    </div>
  )
}

export default App
