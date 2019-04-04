import React from 'react'

const BasicInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
        </div>
    )
}

export default BasicInfo