import React, { useState, useEffect } from 'react'
import PersonList from './Personlist';
import SearchElement from './SearchElement';
import AddPerson from './AddPerson';
import personsService from '../services/Persons'
import Notification from './Notification'

const App = () => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [persons, setPersons] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [{ message, messageType }, setMessage] = useState({ message: null, messageType: null })

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

        if (persons.find(person => person.phone === newPhone)) {
            alert(`${newPhone} on jo käytössä`)
            return
        }

        const foundPerson = persons.find(person => person.name === newName)

        if (foundPerson) {
            const confirm = window.confirm(`${newName} on jo luettelossa, korvataanko numero uudella?`)
            if (!confirm) { return }

            updatePerson(foundPerson)
        } else {
            createPerson()
        }

        setNewName('')
        setNewPhone('')
        setSearchTerm('')
        messagesTimeOut()
    }

    const updatePerson = (foundPerson) => {
        const updatedPerson = { ...foundPerson, phone: newPhone }

        personsService.update(updatedPerson).then(responsePerson => {
            setPersons(persons.map(person => responsePerson.id !== person.id ? person : responsePerson))
            setMessage({ message: `Henkilön ${responsePerson.name} numero päivitetty: ${responsePerson.phone}!`, messageType: 'success' })
        }).catch(error => {
            setPersons(persons.filter(person => person.id !== foundPerson.id))
            setMessage({ message: `Henkilö ${foundPerson.name} oli jo poistettu palvelimelta`, messageType: 'error' })
        })
    }

    const createPerson = () => {
        personsService.create(newName, newPhone).then(responsePerson => {
            setPersons(persons.concat(responsePerson))
            setMessage({ message: `Henkilö ${newName} lisätty!`, messageType: 'success' })
        }).catch(error => {
            setMessage({ message: error.response.data.error, messageType: 'error' })
        })
    }

    const removePerson = (personId) => {
        const foundPerson = persons.find(person => person.id === personId)
        const confirm = window.confirm(`Poistetaanko ${foundPerson.name}`)
        if (!confirm) { return }

        personsService.remove(personId).then(reponse => {
            setPersons(persons.filter(person => person.id !== personId))
            setMessage({ message: `Henkilö ${foundPerson.name} poistettu!`, messageType: 'success' })
        }).catch(error => {
            setPersons(persons.filter(person => person.id !== personId))
            setMessage({ message: `Henkilö ${foundPerson.name} oli jo poistettu palvelimelta`, messageType: 'error' })
        })
        messagesTimeOut()
    }

    const messagesTimeOut = () => (
        setTimeout(() => {
            setMessage({ message: null, messageType: null })
        }, 5000)
    )

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
            <Notification message={message} messageType={messageType} />
            <SearchElement searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <AddPerson saveForm={saveForm} newName={newName} handleNameChange={handleNameChange}
                newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
            <PersonList persons={searchList} removePerson={removePerson} />
        </div>
    )

}

export default App