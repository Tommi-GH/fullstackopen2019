import React from 'react'
import PersonElement from './PersonElement'


const PersonList = ({persons, removePerson}) => {
    
    const personElements = () => persons.map(person => {
        return (
            <PersonElement key={person.id} person={person} removePerson={() => removePerson(person.id)} />
        )
    })
    
    return (
    <div>
        <h2>Numerot</h2>
        <table>
            <tbody>
                <tr>
                    <td>
                        Nimi
                        </td>
                    <td>
                        Puh
                        </td>
                </tr>
                {personElements()}
            </tbody>
        </table>
    </div>
    )
}

export default PersonList