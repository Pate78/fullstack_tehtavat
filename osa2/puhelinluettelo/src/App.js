import React, { useEffect, useState } from 'react'
import AddForm from './Components/AddForm'
import Contacts from './Components/Contacts'
import Filter from './Components/Filter'
import contactService from './Services/contacts'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const  [persons, setPersons] = useState([])
  useEffect(() => {
    contactService
      .getAll()
      .then(res => setPersons(res.data))
  },[])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    // console.log(event.target.value);
    // console.log(persons.find(p => p.name === newName) === undefined);
    // console.log(undefined === true);
    if(persons.find(p => p.name === newName) === undefined) {
      console.log("eipä löytynyt!");
      const newPerson = {
        name: newName,
        number: newNumber
      }
      contactService
        .create(newPerson)
        .then(res => {
          setPersons(persons.concat(res.data))
        })
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const [ filter, setFilter ] = useState('')
  const [personsToShow, setPersonsToShow ] = useState([])
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value)
    setPersonsToShow(persons.filter(p => p.name === event.target.value))
    console.log(personsToShow);
  }

  const handleDelete = (id) => {
    console.log(id);
    contactService
      .remove(id)
      .then(res => setPersons(persons.filter(p => p.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <AddForm
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      ...debug: {newName} <br />
      <Contacts persons={persons} filter={filter} handleDelete={handleDelete}/>

    </div>
  )

}

export default App