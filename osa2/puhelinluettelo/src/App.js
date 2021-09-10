import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
          <div>number: <input onChange={handleNumberChange} value={newNumber}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...debug: {newName} <br />
      {persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)}

    </div>
  )

}

export default App