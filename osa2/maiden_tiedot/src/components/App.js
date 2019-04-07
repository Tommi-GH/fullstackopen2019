import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './Search'
import Results from './Results'
import connections from '../connections'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({text: "", icon: "", temp_c: "", wind_kph: 0, wind_dir: ""})
  const filteredCountries = (searchTerm.length > 0) ? countries.filter(country =>
    country.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  ) : countries

  useEffect(() => {
    axios
      .get(connections.countries.baseUrl)
      .then(response =>
        setCountries(response.data))
  }, [])

  const getWeather = (capital) => {
    useEffect(() => {
      axios
        .get(`${connections.weather.baseUrl}?key=${connections.weather.apiKey}&q=${capital}`)
        .then(result => {
          setWeather({
            text: result.data.current.condition.text,
            icon: result.data.current.condition.icon,
            temp_c: result.data.current.temp_c,
            wind_kph: result.data.current.wind_kph,
            wind_dir: result.data.current.wind_dir})
        })
    },[])
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowClick = (numericCode) => {
    setSearchTerm(countries.find(country => country.numericCode === numericCode).name)
  }

  return (
    <div>
      <h1>Country info service</h1>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Results countryList={filteredCountries} handleShowClick={handleShowClick} weather={weather} getWeather={getWeather}/>
    </div>
  )
}

export default App;
