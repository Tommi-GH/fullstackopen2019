import React from 'react'
import Result from './Result';
import BasicInfo from './BasicInfo';
import Languages from './Languages';
import Weather from './Weather'


const Results = ({ countryList, handleShowClick, weather, getWeather }) => {

    if (countryList.length > 10) {
        return (
            <div>Too many matches, please extend search term</div>
        )
    }

    if (countryList.length === 0) {
        return (
            <div>No country names match the search term</div>
        )
    }

    

    if (countryList.length === 1) {
        const country = countryList[0]
        getWeather(country.capital)
        
        return (
            <div>
                <BasicInfo country={country} />
                <Languages languages={country.languages}/>
                <h4>Flag:</h4>
                <img src={country.flag} alt={country.flag} width='200' />
                <Weather capital={country.capital} weather={weather} />
            </div>
        )
    }

    return (
        <div>
            <h2>Results:</h2>
            {countryList.map(country =>
                <Result key={country.numericCode} country={country} handleShowClick={handleShowClick} />)}

        </div>
    )
}

export default Results