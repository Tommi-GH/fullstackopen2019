import React from 'react'

const PersonElement = ({ person, removePerson }) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.phone}</td>
        <td>
            <button onClick={removePerson}>Poista</button>
        </td>
    </tr>
)

export default PersonElement