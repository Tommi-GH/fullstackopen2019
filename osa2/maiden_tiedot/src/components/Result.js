import React from 'react'


const Result = ({country, handleShowClick}) => {
    return(
        <p>
            {country.name} <button id={country.numericCode} onClick={handleShowClick}>Show</button>
        </p>
    )
}

export default Result