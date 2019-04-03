import React from 'react'

const SearchElement = ({ searchTerm, handleSearchChange }) => (
    <div>
        Haku: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
)

export default SearchElement