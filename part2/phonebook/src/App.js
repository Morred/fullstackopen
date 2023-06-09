import { useState, useEffect } from 'react'
import AddNewPersonForm from './components/AddNewPersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import People from './components/People'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
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
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName )
        
        personService
          .update(person.id, { ...person, number: newNumber } )
          .then(returnedPerson => {
            const newPersonList = persons.filter(person => person.name !== newName).concat(returnedPerson)
            setPersons(newPersonList)
            setPersonsToShow(newPersonList)
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }

      personService
        .create(personObject)
        .then(returnedPerson => {
          const newPersonList = persons.concat(returnedPerson)
          setPersons(newPersonList)
          setPersonsToShow(newPersonList)
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .destroy(id)
        .then(returnedData => {
          const newPersonList = persons.filter(person => person.id !== id)
          setPersons(newPersonList)

          // Reset filter so displayed list updates
          setFilter('')
          setPersonsToShow(newPersonList)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
      <People people={personsToShow} deletePersonHandler={deletePerson}/>
    </div>
  )
}

export default App
