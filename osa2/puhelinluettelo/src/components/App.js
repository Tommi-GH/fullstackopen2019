import React, { useState, useEffect } from 'react'
import PersonList from './Personlist';
import SearchElement from './SearchElement';
import AddPerson from './AddPerson';
import personsService from '../services/Persons'

const App = () => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [persons, setPersons] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const searchList = (searchTerm.length > 0) ? persons.filter(person =>
        person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    ) : persons

    useEffect(() => {
        personsService.getAll().then(returnedPersons => 
            setPersons(returnedPersons))
        }, [])

    const saveForm = (event) => {
        event.preventDefault()
        if (newName.length === 0 || newPhone.length === 0) {
            alert("Täytä molemmat kentät")
            return
        }
        
        if (persons.find(person => person.phone.localeCompare(newPhone) === 0)) {
            alert(`${newPhone} on jo käytössä`)
            return
        }

        const foundPerson = persons.find(person => person.name.localeCompare(newName) === 0)

        if (foundPerson) {
            const confirm = window.confirm(`${newName} on jo luettelossa, korvataanko numero uudella?`)
            if(!confirm){ return }
            const updatePerson = { ...foundPerson, phone: newPhone }
            
            personsService.update(updatePerson).then(responsePerson =>
                setPersons(persons.map(person => responsePerson.id !== person.id ? person : responsePerson))
            )
            
        } else{    
            personsService.create(newName, newPhone).then(responsePerson =>
                setPersons(persons.concat(responsePerson))
            )
        }

        setNewName('')
        setNewPhone('')
        setSearchTerm('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleRemove = (personId) => {

        const confirm = window.confirm(`Poistetaanko ${persons.find(person => person.id === personId).name}`)
        if(!confirm){ return }

        personsService.remove(personId).then(
            setPersons(persons.filter(person => person.id !== personId))
        )
        
    }


    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <SearchElement searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <AddPerson saveForm={saveForm} newName={newName} handleNameChange={handleNameChange}
                newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
            <PersonList persons={searchList} removePerson={handleRemove} />
        </div>
    )

}

export default App