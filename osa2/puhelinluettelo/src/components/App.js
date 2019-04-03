import React, { useState } from 'react'
import PersonList from './Personlist';
import SearchElement from './SearchElement';
import AddPerson from './AddPerson';

const App = () => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [persons, setPersons] = useState([
        { id: 0, name: 'Arto Hellas', phone: '040-123456' },
        { id: 1, name: 'Martti Tienari', phone: '040-123456' },
        { id: 2, name: 'Arto Järvinen', phone: '040-123456' },
        { id: 3, name: 'Lea Kutvonen', phone: '040-123456' }
    ])
    const [searchTerm, setSearchTerm] = useState('')
    
    const searchList = (searchTerm.length>0) ? persons.filter(person => 
        person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        ) : persons

    const saveForm = (event) => {
        event.preventDefault()
        if (newName.length === 0 || newPhone.length === 0) {
            alert("Täytä molemmat kentät")
            return
        } else if (persons.find(person => person.name.localeCompare(newName) === 0)) {
            alert(`${newName} on jo luettelossa`)
            return
        } else if (persons.find(person => person.phone.localeCompare(newPhone) === 0)) {
            alert(`${newPhone} on jo luettelossa`)
            return
        }
        const person = {
            id: persons.length + 1,
            name: newName,
            phone: newPhone
        }
        setPersons(persons.concat(person))
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


    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <SearchElement searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <AddPerson saveForm={saveForm} newName={newName} handleNameChange={handleNameChange}
                        newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>
            <PersonList persons={searchList}/>
        </div>
    )

}

export default App