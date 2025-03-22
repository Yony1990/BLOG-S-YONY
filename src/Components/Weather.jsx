import React, { useEffect, useState } from 'react'
import './weather.css'
import axios from 'axios'

const Weather = () => {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = 'Montevideo'

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=74351d4cb5e227f666e0acdcb8677d69`

      const response = await axios.get(url)
      setData(response.data)
    }
    fetchDefaultLocation()
  }, [])

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=74351d4cb5e227f666e0acdcb8677d69`

    try {
      const response = await axios.get(url)
      if(response.data.cod != 200) {
        setData({notFound: true})
      } else {
        setData(response.data)
        setLocation('')
      } 
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
          setData({notFound: true})
        } else {
          console.log('error inesperado', error)
        }
    }

  }

  const handleInputChange = (e) => {
    setLocation(e.currentTarget.value)
  }

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return <i className='bx bxs-sun'></i>
      case 'Clouds':
        return <i className='bx bxs-cloud'></i>
      case 'Rain':
        return <i className='bx bxs-cloud-rain'></i>
      case 'Thumderstorm':
        return <i className='bx bxs-cloud-lightning'></i>
      case 'Snow':
        return <i className='bx bxs-cloud-snow'></i>
      case 'Haze':
      case "Mist":
        return <i className='bx bxs-cloud'></i>
      default:
        return <i className='bx bxs-sun'></i>
    }
  }

  const handleKeyDowm = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  return (
    <div className='weather'>
      <div className="search">
        <div className="search-top">
          <i className="bi bi-geo-alt-fill"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input 
            type="text" 
            placeholder='Enter Location'
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDowm}
          />
          <i className="bi bi-search" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (<div className='not-found'>Not Found 😒</div>) : (
        <div className="weather-data">
          {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
          <div className="temp">{data.main ? `${Math.floor(data.main.temp - 274)}°` : null}</div>
        </div>
      )}
      
    </div>
  )
}

export default Weather
