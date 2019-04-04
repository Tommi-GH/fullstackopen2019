import React from 'react'

const Languages = ({ languages }) => {
    return (
        <div>
            <h4>Languages:</h4>
            <ul>
                {languages.map(language =>
                    <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
        </div>
    )
}

export default Languages