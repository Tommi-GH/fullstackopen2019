import React from 'react'


const Weather = ({capital, weather}) => {
    return(
        <div>
            <h2>Weather in {capital}:</h2>
            <p>Temperature: {weather.temp_c}</p>
            <img src={weather.icon} alt={weather.text}/>
            <p>Wind: {weather.wind_kph} direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather