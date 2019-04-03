import React from 'react'

const PersonElement = ({person}) => (
    <tr><td>{person.name}</td><td>{person.phone}</td></tr>
)

export default PersonElement