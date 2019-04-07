import React from 'react'


const Result = ({country, handleShowClick}) => {
    console.log(handleShowClick)
    return(
        <p>
            {country.name} <button onClick={handleShowClick}>Show</button>
        </p>
    )
}

export default Result