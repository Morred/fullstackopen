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
  const [successNotification, setSuccessNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)
  const [infoNotification, setInfoNotification] = useState(null)

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

  const updatePersonLists = (newPersonList) => {
    setPersons(newPersonList)
    setPersonsToShow(newPersonList)
    setNewName('')
    setNewNumber('')
  }

  const registerNotification = (notificationType, text) => {
    if (notificationType === 'success') {
      setSuccessNotification(text)
      setTimeout(() => {
        setSuccessNotification(null)
      }, 5000)
    } else if (notificationType === 'error') {
      setErrorNotification(text)
      setTimeout(() => {
        setErrorNotification(null)
      }, 5000)
    } else {
      setInfoNotification(text)
      setTimeout(() => {
        setInfoNotification(null)
      }, 5000)
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
            updatePersonLists(persons.filter(person => person.name !== newName).concat(returnedPerson))
            registerNotification('success', `Updated ${returnedPerson.name}`)
          })
          .catch(error => {
            const newPersonList = persons.filter(person => person.name !== newName)
            updatePersonLists(newPersonList)
            registerNotification('error', `${person.name} was already deleted from the server`)
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }

      personService
        .create(personObject)
        .then(returnedPerson => {
          updatePersonLists(persons.concat(returnedPerson))
          registerNotification('success', `Added ${returnedPerson.name}`)
        })
    }
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .destroy(id)
        .then(returnedData => {
          updatePersonLists(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successNotification} className='success' />
      <Notification message={errorNotification} className='error' />
      <Notification message={infoNotification} className='info' />
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
