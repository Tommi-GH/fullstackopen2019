import React from 'react'


const Search = ({searchTerm, handleSearchChange}) => {
    return(
        <div>
            <h2>Search:</h2>
            Country name: <input value={searchTerm} onChange={handleSearchChange} />
        </div>
    )
}

export default Search